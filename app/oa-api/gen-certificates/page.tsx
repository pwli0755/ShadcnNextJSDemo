"use client";
import { Button } from "@/components/ui/button";
import CustomCodeBlock from "@/components/ui/code-blocks";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, ChevronsUpDown, CopyIcon, Loader2 } from "lucide-react";
import React, { MouseEventHandler, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import crypto from "crypto";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import { useTheme } from "next-themes";
import {
  a11yLight,
  atelierCaveLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

var random = randomString(16);
function sha1(s: string) {
  var hash = crypto.createHash("sha1");
  hash.update(s);
  return hash.digest("hex");
}
function aesEncrypt(data: any, key: any, iv: any) {
  var cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  var crypted = cipher.update(data, "utf8", "binary");
  crypted += cipher.final("binary");
  crypted = Buffer.from(crypted, "binary").toString("base64");
  return crypted;
}
function randomString(code: number) {
  let len = code;
  let $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  let maxLen = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxLen));
  }
  return pwd;
}

function genReqParams(obj: object) {
  var _data = aesEncrypt(JSON.stringify(obj), "kjX3yBgJCaFHszod", random);

  var _timestamp = Math.floor(new Date().getTime() / 1000).toString();
  var params: any = {
    token: "kjX3yBgJCaFHszod",
    nonce: random,
    timestamp: _timestamp,
    data: _data,
  };
  var arr = [params.token, params.nonce, params.timestamp, params.data];
  var str = arr.sort().toString().replace(/,/g, "");
  var signature = sha1(str);
  return JSON.stringify(
    {
      timestamp: _timestamp,
      nonce: random,
      signature: signature,
      data: _data,
    },
    null,
    "\n"
  );
}

const FormSchema = z.object({
  oa_process_number: z
    .string()
    .min(10, {
      message: "oa_process_number must be at least 10 characters.",
    })
    .max(160, {
      message: "oa_process_number must not be longer than 30 characters.",
    })
    .default("oa20240717xxxxxx"),

  license_type: z.string(),
  biz_id: z.string(),
  project_name: z.string().optional(),
  contract_no: z.string(),
  order_no: z.string(),
  auth_object: z.string(),
  product_name: z.string(),
  after_sales_service_type: z.string(),
  after_sales_service_duration: z.number(),
  after_sales_service_start_date: z.string(),
  after_sales_service_end_date: z.string(),
  num: z.number(),
  auth_level_name: z.string().optional(),
  auth_property_name: z.string().optional(),
});

const GenCertificates = () => {
  const [code, setCode] = useState<string>("");
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loginIsPending, setLoginIsPending] = React.useState(false);
  const [loginToken, setLoginToken] = React.useState("");
  const [genLicenseParams, setGenLicenseParams] = useState("");
  const [submitIsPending, setSubmitIsPending] = React.useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onLogin = (e: any) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://openlicsrvi-dev.chinauos.com",
      },
      body: code,
    };
    e.preventDefault();
    setLoginIsPending(true);

    const login = () => {
      fetch(
        "https://openlicsrvi-dev.chinauos.com/app/login?app_id=5fec809af57c233e694431c5",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setLoginToken(data.data.access_token);
          setLoginIsPending(false);
          toast({
            title: "对外网关登录成功",

            description: (
              <pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4 text-wrap break-words select-text">
                {`token: ${data.data.access_token}`}
              </pre>
            ),
          });
        })
        .catch((error) => console.log(error));
    };
    login();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // license_type: "1",
      oa_process_number: "oa20240717xxxxxx",
      biz_id: "1001_formtable_main_443",
      project_name: "projectX",
      contract_no: "contract_noxxx",
      order_no: "202407111702231713",
      auth_object: "xxx",
      product_name: "统信桌面操作系统 V20 专业版 AMD64",
      // after_sales_service_type: "4",
      after_sales_service_duration: 24,
      after_sales_service_start_date: "2024/02/20",
      after_sales_service_end_date: "2026/02/20",
      num: 100,
      auth_level_name: "密安授权",
      auth_property_name: "办公专用授权",
    },
  });

  const watchAfterSalesServiceType = form.watch("after_sales_service_type"); // you can supply default value as second argument
  console.log("watchAfterSalesServiceType=", watchAfterSalesServiceType);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    var obj = {
      oa_process_number: data.oa_process_number,
      data: [
        {
          license_type: parseInt(data.license_type),
          biz_id: data.biz_id,
          project_name: data.project_name,
          contract_no: data.contract_no,
          order_no: data.order_no,
          auth_object: data.auth_object,
          product_name: data.product_name,
          after_sales_service_type: parseInt(data.after_sales_service_type),
          after_sales_service_duration: data.after_sales_service_duration,
          after_sales_service_start_date: data.after_sales_service_start_date,
          after_sales_service_end_date: data.after_sales_service_end_date,
          num: data.num,
          license_ext: {
            auth_level_name: data.auth_level_name,
            auth_property_name: data.auth_property_name,
          },
        },
      ],
    };
    console.log(JSON.stringify(obj));
    var req = genReqParams(obj);
    console.log(req);
    setGenLicenseParams(req);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://openlicsrvi-dev.chinauos.com",
        Authorization: loginToken,
      },
      body: req,
    };
    setSubmitIsPending(true);

    const submit = () => {
      fetch(
        "https://openlicsrvi-dev.chinauos.com/v1/license/gen-certificate",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setSubmitIsPending(false);
          if (data.code !== 0) {
            toast({
              variant: "destructive",

              title: "生成授权证书失败",
              description: (
                <pre className="mt-2 w-[340px] rounded-md p-4 text-wrap break-words bg-destructive">
                  {JSON.stringify(data)}
                </pre>
              ),
            });
            return;
          }
          toast({
            title: "生成授权证书成功",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-wrap break-words select-text">
                {JSON.stringify(data)}
              </pre>
            ),
          });
        })
        .catch((error) => console.log(error));
    };
    submit();
  }

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-auto space-y-2 flex flex-col"
      >
        <Button
          className="flex gap-1"
          onClick={() => {
            setCode(
              genReqParams({
                app_secret: "5823bf96d3bd56c7",
              })
            );
            setIsCopied(false);
          }}
        >
          构造鉴权参数
          <CollapsibleTrigger>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </Button>

        <CollapsibleContent>
          <div className="relative p-4 flex">
            <SyntaxHighlighter
              language="json"
              style={theme === "dark" ? atomDark : atelierCaveLight}
              showLineNumbers={true}
              wrapLines={true}
            >
              {code}
            </SyntaxHighlighter>
            <div
              className="absolute top-4 right-4 m-5 hover:opacity-80 cursor-pointer"
              onClick={() => {
                copyToClipboard(code);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000);
              }}
            >
              {isCopied ? <Check color="green" /> : <CopyIcon />}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {code && (
        <Button disabled={loginIsPending} onClick={onLogin}>
          {loginIsPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          对外网关登录
        </Button>
      )}
      {loginToken && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="oa_process_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OA流程单号</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="oa流程单号"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      请填写oa流程单号，需要唯一
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="license_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>许可证类型</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="许可证类型" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">uos授权许可证</SelectItem>
                          <SelectItem value="2">deepin授权许可证</SelectItem>
                          <SelectItem value="3">uos服务续期许可证</SelectItem>
                          <SelectItem value="4">
                            deepin服务续期许可证
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="biz_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OA业务id </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="biz_id"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目名称 </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="project_name"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>合同编号</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>订单编号</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auth_object"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>授权对象</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>产品名称</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="after_sales_service_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>售后服务类型名称</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="售后服务类型名称" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">标准服务</SelectItem>
                        <SelectItem value="3">现场服务</SelectItem>
                        <SelectItem value="4">无服务</SelectItem>
                        <SelectItem value="5">高级服务</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {watchAfterSalesServiceType !== undefined &&
                watchAfterSalesServiceType != "4" && (
                  <>
                    <FormField
                      control={form.control}
                      name="after_sales_service_duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>服务期限月份</FormLabel>
                          <FormControl>
                            <Input
                              className="resize-none"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="after_sales_service_start_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>售后服务时长开始时间</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="after_sales_service_end_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>售后服务时长结束时间</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

              <FormField
                control={form.control}
                name="num"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>授权数量</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auth_level_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>授权密级名称</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="auth_property_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>授权属性名称</FormLabel>
                    <FormControl>
                      <Input className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={submitIsPending}>
                {submitIsPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default GenCertificates;
