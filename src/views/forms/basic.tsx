import { useState } from "react";
import { Form, TextField, Input, Label, Select, ListBox, FieldError, Description, Button } from "@heroui/react";
import { BuiPage } from "../../components/baseui";
import { Send } from "lucide-react";
import { useSetPageTitle } from "../../stores";

const COUNTRIES = [
  { id: "cn", name: "中国" },
  { id: "us", name: "美国" },
  { id: "jp", name: "日本" },
  { id: "uk", name: "英国" },
  { id: "de", name: "德国" },
];

const FormBasic = () => {
  useSetPageTitle("基础表单", "表单组件与验证示范");
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Record<string, string> = {};
    new FormData(e.currentTarget).forEach((v, k) => { data[k] = v.toString(); });
    // Password consistency check / 密码一致性验证
    if (data.password !== data.confirmPassword) { return; }
    // Password consistency check / 密码一致性验证
    if (data.password !== data.confirmPassword) { return; }
    setSubmitted(data);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl">
        {submitted ? (
          <div className="rounded-2xl bg-surface p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">表单已提交</h2>
            <pre className="rounded-lg bg-surface-tertiary p-4 text-sm text-foreground">{JSON.stringify(submitted, null, 2)}</pre>
            <Button variant="secondary" className="mt-4" onPress={() => setSubmitted(null)}>再试一次</Button>
          </div>
        ) : (
          <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="rounded-2xl bg-surface p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-foreground">个人信息</h2>
              <div className="flex flex-col gap-4">
                <TextField isRequired name="name" validate={(v) => v.trim() ? null : "请输入姓名"}>
                  <Label>姓名</Label>
                  <Input placeholder="输入姓名" />
                  <FieldError />
                </TextField>
                <TextField isRequired name="email" type="email" validate={(v) => emailRegex.test(v) ? null : "请输入有效邮箱"}>
                  <Label>邮箱</Label>
                  <Input placeholder="email@example.com" />
                  <FieldError />
                </TextField>
                <Select name="country" className="w-full">
                  <Label>国家/地区</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {COUNTRIES.map((c) => <ListBox.Item key={c.id} id={c.id} textValue={c.name}>{c.name}<ListBox.ItemIndicator /></ListBox.Item>)}
                    </ListBox>
                  </Select.Popover>
                </Select>
                <TextField name="bio">
                  <Label>个人简介</Label>
                  <Input placeholder="简单介绍一下自己" />
                  <Description>可选，最多 200 字</Description>
                </TextField>
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-foreground">安全设置</h2>
              <div className="flex flex-col gap-4">
                <TextField isRequired name="password" type="password" minLength={6} validate={(v) => v.length >= 6 ? null : "密码至少 6 个字符"}>
                  <Label>密码</Label>
                  <Input placeholder="输入密码" />
                  <Description>至少 6 个字符</Description>
                  <FieldError />
                </TextField>
                <TextField isRequired name="confirmPassword" type="password" validate={(v) => v ? null : "请确认密码"}>
                  <Label>确认密码</Label>
                  <Input placeholder="再次输入密码" />
                  <FieldError />
                </TextField>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="reset" variant="secondary">重置</Button>
              <Button type="submit"><Send size={16} />提交</Button>
            </div>
          </Form>
        )}
      </div>
    </BuiPage>
  );
};

export default FormBasic;
