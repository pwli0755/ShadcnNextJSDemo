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
import React, {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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

import CodeEditor from "@uiw/react-textarea-code-editor";

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

function genReqParams(req: string, app_key: string) {
  var _data = aesEncrypt(req, app_key, random);

  var _timestamp = Math.floor(new Date().getTime() / 1000).toString();
  var params: any = {
    token: app_key,
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
  host: z.string(),
  path: z.string(),
  app_id: z.string(),
  app_key: z.string(),
  app_secret: z.string(),
  data: z.string(),
});

const OaApiPage = () => {
  const [code, setCode] = useState<string>("");
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loginIsPending, setLoginIsPending] = React.useState(false);
  const [genLicenseParams, setGenLicenseParams] = useState("");
  const [submitIsPending, setSubmitIsPending] = React.useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      host: "https://openlicsrvi-dev.chinauos.com",
      path: "/v1/license/gen-certificate",
      app_id: "5fec809af57c233e694431c5",
      app_key: "kjX3yBgJCaFHszod",
      app_secret: "5823bf96d3bd56c7",
      data: `{
        "oa_process_number": "oa202407170000008",
        "data": [
          {
            "license_type": 1,
            "biz_id": "1001_formtable_main_443001",
            "project_name": "projectX",
            "contract_no": "contract_no0001",
            "order_no": "202407111702231713001",
            "auth_object": "001",
            "product_name": "统信桌面操作系统 V20 专业版 AMD64",
            "after_sales_service_type": 1,
            "after_sales_service_duration": 24,
            "after_sales_service_start_date": "2024/02/20",
            "after_sales_service_end_date": "2026/02/20",
            "num": 100,
            "license_ext": {
              "auth_level_name": "密安授权",
              "auth_property_name": "办公专用授权"
            }
          },
          {
            "license_type": 2,
            "biz_id": "1001_formtable_main_443002",
            "project_name": "projectY",
            "contract_no": "contract_no002",
            "order_no": "202407111702231713002",
            "auth_object": "002",
            "product_name": "统信桌面操作系统 V20 专业版 AMD64",
            "after_sales_service_type": 5,
            "after_sales_service_duration": 24,
            "after_sales_service_start_date": "2024/02/20",
            "after_sales_service_end_date": "2026/02/20",
            "num": 100,
            "license_ext": {
              "auth_level_name": "密安授权",
              "auth_property_name": "办公专用授权"
            }
          },
          {
            "license_type": 3,
            "biz_id": "1001_formtable_main_443003",
            "project_name": "projectY3",
            "contract_no": "contract_no003",
            "order_no": "202407111702231713003",
            "auth_object": "003",
            "product_name": "统信桌面操作系统 V20 专业版 AMD64",
            "after_sales_service_type": 3,
            "after_sales_service_duration": 24,
            "after_sales_service_start_date": "2024/02/20",
            "after_sales_service_end_date": "2026/02/20",
            "num": 100,
            "license_ext": {
              "auth_level_name": "密安授权",
              "auth_property_name": "办公专用授权"
            }
          },
          {
            "license_type": 4,
            "biz_id": "1001_formtable_main_443004",
            "project_name": "projectZ",
            "contract_no": "contract_no004",
            "order_no": "202407111702231713004",
            "auth_object": "004",
            "product_name": "统信桌面操作系统 V20 专业版 AMD64",
            "after_sales_service_type": 4,
            "num": 100,
            "license_ext": {
              "auth_level_name": "密安授权",
              "auth_property_name": "办公专用授权"
            }
          },
          {
            "license_type": 2,
            "biz_id": "1001_formtable_main_443005",
            "project_name": "projectY5",
            "contract_no": "contract_no005",
            "order_no": "202407111702231713005",
            "auth_object": "005",
            "product_name": "统信桌面操作系统 V20 专业版 AMD64",
            "after_sales_service_type": 4,
            "after_sales_service_duration": 24,
            "after_sales_service_start_date": "2024/02/20",
            "after_sales_service_end_date": "2026/02/20",
            "num": 100,
            "license_ext": {
              "auth_level_name": "密安授权",
              "auth_property_name": "办公专用授权"
            }
          }
        ]
      }`,
    },
  });
  const dataValue = form.watch("data"); // you can supply default value as second argument

  const resizeTextArea = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    // textareaRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(resizeTextArea, [dataValue]);

  function onSubmit(formData: z.infer<typeof FormSchema>): void {
    console.log({ formData });
    const loginReq = genReqParams(
      JSON.stringify({
        app_secret: formData.app_secret,
      }),

      formData.app_key
    );
    console.log("loginReq:", loginReq);
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
      body: loginReq,
    };
    var loginToken: string = "";
    fetch(
      // "https://openlicsrvi-dev.chinauos.com/app/login?app_id=5fec809af57c233e694431c5",
      `${formData.host}/app/login?app_id=${formData.app_id}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loginToken = data.data.access_token;
        toast({
          title: "对外网关登录成功",
          description: (
            <pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4 text-wrap break-words select-text">
              {`token: ${data.data.access_token}`}
            </pre>
          ),
        });
      })
      .then(() => {
        var req = genReqParams(formData.data, formData.app_key);
        console.log(req);

        options.headers = {
          "Content-Type": "application/json",
          Authorization: loginToken,
        };
        options.body = req;

        setSubmitIsPending(true);

        fetch(`${formData.host}${formData.path}`, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            setSubmitIsPending(false);
            if (data.code !== 0) {
              toast({
                variant: "destructive",
                title: "生成授权证书失败",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md p-4 text-wrap break-words bg-destructive select-text">
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
          .catch((error) => {
            console.log(error);
            toast({
              variant: "destructive",
              title: "生成授权证书失败",
              description: (
                <pre className="mt-2 w-[340px] rounded-md p-4 text-wrap break-words bg-destructive">
                  {JSON.stringify(error)}
                </pre>
              ),
            });
          });
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "对外网关登录失败",
          description: (
            <pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4 text-wrap break-words select-text">
              {JSON.stringify(error)}
            </pre>
          ),
        });
        return;
      });
  }

  return (
    <>
      <h2 className="mb-4">对外网关OA接口通用表单</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>域名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入对外网关域名" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>接口地址</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="app_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>应用id</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="app_key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>应用key</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="app_secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>应用私钥</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormLabel>请求参数</FormLabel>
                <FormControl>
                  {/* <Textarea
                    placeholder="请输入"
                    {...field}
                    ref={textareaRef}
                    className="overflow-hidden resize-none"
                  /> */}
                  {/* <CodeEditor */}
                  <Textarea
                    data-color-mode={theme === "light" ? "light" : "dark"}
                    {...field}
                    onChange={(e) => {
                      var val = e.target.value;
                      if (e.target.value) {
                        try {
                          val = JSON.stringify(
                            JSON.parse(e.target.value),
                            null,
                            2
                          );
                        } catch (err) {
                          val = e.target.value;
                        }
                      }
                      e.target.value = val;
                      field.onChange(e);
                    }}
                    value={(function (val: string): string {
                      var tmp: string = val;
                      if (val) {
                        try {
                          tmp = JSON.stringify(JSON.parse(val), null, 2);
                        } catch (err) {
                          tmp = val;
                        }
                      }
                      return tmp;
                    })(field.value)}
                    ref={textareaRef}
                    // language="json"
                    // padding={15}
                    placeholder="Please enter JSON string."
                    // rehypePlugins={[[rehypePrism, { ignoreMissing: true }]]}
                    className="overflow-hidden resize-none"
                    style={{
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                  />
                </FormControl>
                <FormDescription>
                  JSON字符串形式的请求参数（无需加密）
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default OaApiPage;
