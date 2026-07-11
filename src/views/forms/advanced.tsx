import { useState } from "react";
import { BuiPage } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Button, Card, Input, TextField, Label, Select, ListBox, TextArea } from "@heroui/react";
import { SuiSteps, SuiFileUpload, SuiRichText } from "../../components/serviceui";
import type { Step } from "../../components/serviceui";
import { CheckCircle } from "lucide-react";

const SKILLS = ["React", "TypeScript", "Node.js", "Python", "Java", "设计", "产品", "运营"];

const FormAdvanced = () => {
  useSetPageTitle("高级表单", "分步表单 + 动态字段 + 文件上传");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  // Step 1: Basic info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // Step 2: Skills & upload
  const [skills, setSkills] = useState<string[]>([]);
  // Step 3: Bio
  const [bio, setBio] = useState("");

  const steps: Step[] = [
    { title: "基本信息", description: "姓名和联系方式", content: (<div className="flex flex-col gap-4"><TextField isRequired><Label>{"姓名"}</Label><Input value={name} onChange={(e) => setName((e.target as unknown as HTMLTextAreaElement).value)} placeholder="输入姓名" /></TextField><TextField isRequired><Label>{"邮箱"}</Label><Input value={email} onChange={(e) => setEmail((e.target as unknown as HTMLTextAreaElement).value)} placeholder="email@example.com" /></TextField><Select value={role} onChange={(value) => { setRole(value as string); }}><Label>{"职位"}</Label><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover><ListBox><ListBox.Item id="frontend" textValue="前端工程师">{"前端工程师"}</ListBox.Item><ListBox.Item id="backend" textValue="后端工程师">{"后端工程师"}</ListBox.Item><ListBox.Item id="fullstack" textValue="全栈工程师">{"全栈工程师"}</ListBox.Item><ListBox.Item id="designer" textValue="设计师">{"设计师"}</ListBox.Item></ListBox></Select.Popover></Select></div>) },
    { title: "技能与附件", description: "技能标签和文件上传", content: (<div className="flex flex-col gap-4"><Label>{"技能标签"}</Label><div className="flex flex-wrap gap-1.5">{SKILLS.map(s => <button key={s} onClick={() => setSkills(prev => prev.includes(s) ? prev.filter(t => t !== s) : [...prev, s])} className={"inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all " + (skills.includes(s) ? "bg-accent text-accent-foreground" : "bg-surface-tertiary text-foreground-500 hover:text-foreground")}>{s}</button>)}</div><div className="mt-2"><Label>{"附件上传"}</Label><SuiFileUpload multiple maxFiles={5} accept=".pdf,.doc,.docx,.xlsx" description="支持 PDF/Word/Excel，最多 5 个文件" /></div></div>) },
    { title: "个人简介", description: "详细描述", content: (<div className="flex flex-col gap-4"><TextField><Label>{"个人简介"}</Label><TextArea value={bio} onChange={(e) => setBio((e.target as unknown as HTMLTextAreaElement).value)} placeholder="简单介绍一下自己..." rows={4} /></TextField><Label>{"个人主页内容"}</Label><SuiRichText minHeight={200} /></div>) },
  ];

  if (done) return (<BuiPage className="h-full" contentClassName="flex items-center justify-center"><div className="flex flex-col items-center text-center"><CheckCircle size={64} className="text-success" /><h2 className="mt-4 text-xl font-semibold text-foreground">{"提交成功！"}</h2><p className="mt-2 text-sm text-foreground-500">{"您的信息已成功提交，我们会尽快与您联系。"}</p><Button variant="secondary" className="mt-6" onPress={() => { setStep(0); setDone(false); setName(""); setEmail(""); setRole(""); setSkills([]); setBio(""); }}>{"重新填写"}</Button></div></BuiPage>);

  return (<BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col">
    <div className="mx-auto w-full max-w-2xl">
      <Card className="p-6"><Card.Content>
        <SuiSteps steps={steps} current={step}
          onNext={() => setStep(Math.min(steps.length - 1, step + 1))}
          onPrev={() => setStep(Math.max(0, step - 1))}
          onFinish={() => setDone(true)}
        />
      </Card.Content></Card>
    </div>
  </BuiPage>);
};
export function Component() { return <FormAdvanced />; }
