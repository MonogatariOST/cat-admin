import { useState } from "react";
import { BuiPage } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import {
  Button,
  Modal,
  Input,
  TextField,
  TextArea,
  Label,
  Select,
  ListBox,
} from "@heroui/react";
import { Plus, GripVertical, Trash2 } from "lucide-react";

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

const priorityColors: Record<string, string> = {
  high: "bg-danger/10 text-danger border-danger/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};
const priorityLabels: Record<string, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

const INITIAL_DATA: KanbanColumn[] = [
  {
    id: "todo",
    title: "待办",
    cards: [
      {
        id: "c1",
        title: "设计新首页",
        description: "完成新的 landing page 设计稿",
        priority: "high",
      },
      {
        id: "c2",
        title: "编写 API 文档",
        description: "更新 REST API 接口文档",
        priority: "medium",
      },
    ],
  },
  {
    id: "progress",
    title: "进行中",
    cards: [
      {
        id: "c3",
        title: "用户模块重构",
        description: "将用户模块迁移到新架构",
        priority: "high",
      },
      {
        id: "c4",
        title: "数据导出功能",
        description: "实现 CSV/Excel 导出",
        priority: "medium",
      },
    ],
  },
  {
    id: "review",
    title: "审核",
    cards: [
      {
        id: "c5",
        title: "PR: 修复登录 BUG",
        description: "修复 OAuth 登录的重定向问题",
        priority: "high",
      },
    ],
  },
  {
    id: "done",
    title: "已完成",
    cards: [
      {
        id: "c6",
        title: "初始化项目",
        description: "完成项目的基础搭建",
        priority: "low",
      },
      {
        id: "c7",
        title: "配置 CI/CD",
        description: "接入 GitHub Actions",
        priority: "medium",
      },
    ],
  },
];

const KanbanBoard = () => {
  let cardCounter = 100;
  useSetPageTitle("任务看板", "拖拽式任务管理看板");
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_DATA);
  const [dragCard, setDragCard] = useState<{
    card: KanbanCard;
    fromCol: string;
  } | null>(null);
  // Modal state / 弹窗状态
  const [modalOpen, setModalOpen] = useState(false);
  const [addTargetCol, setAddTargetCol] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const [newCardPriority, setNewCardPriority] = useState<
    "high" | "medium" | "low"
  >("medium");

  const handleDragStart = (card: KanbanCard, colId: string) => {
    setDragCard({ card, fromCol: colId });
  };
  const handleDrop = (toColId: string) => {
    if (!dragCard || dragCard.fromCol === toColId) {
      setDragCard(null);
      return;
    }
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === dragCard.fromCol)
          return {
            ...col,
            cards: col.cards.filter((c) => c.id !== dragCard.card.id),
          };
        if (col.id === toColId)
          return { ...col, cards: [...col.cards, dragCard.card] };
        return col;
      }),
    );
    setDragCard(null);
  };
  const deleteCard = (colId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col,
      ),
    );
  };
  const openAddDialog = (colId: string) => {
    setAddTargetCol(colId);
    setNewCardTitle("");
    setNewCardDesc("");
    setNewCardPriority("medium");
    setModalOpen(true);
  };
  const confirmAdd = () => {
    if (!newCardTitle.trim()) return;
    const newCard: KanbanCard = {
      id: "c" + ++cardCounter,
      title: newCardTitle,
      description: newCardDesc,
      priority: newCardPriority,
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === addTargetCol
          ? { ...col, cards: [...col.cards, newCard] }
          : col,
      ),
    );
    setModalOpen(false);
  };

  return (
    <BuiPage className="h-full" contentClassName="flex min-h-0 flex-1 flex-col">
      <div className="mb-4 flex items-center gap-2 text-xs text-foreground-400">
        <GripVertical size={14} />
        {"拖拽卡片到其他列以移动"}
      </div>
      <div
        className="grid flex-1 grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-4"
        style={{ minHeight: 0 }}
      >
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex flex-col rounded-xl bg-surface-secondary p-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}{" "}
                <span className="text-xs text-foreground-400">
                  ({col.cards.length})
                </span>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                aria-label={"添加任务到 " + col.title}
                onPress={() => openAddDialog(col.id)}
              >
                <Plus size={14} />
              </Button>
            </div>
            <div
              className="flex flex-col gap-2 overflow-y-auto"
              style={{ minHeight: 200 }}
            >
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card, col.id)}
                  className="cursor-grab rounded-lg border border-border bg-surface p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {card.title}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      isIconOnly
                      className="-mr-1 -mt-1 size-6 min-w-0"
                      aria-label="删除"
                      onPress={() => deleteCard(col.id, card.id)}
                    >
                      <Trash2
                        size={12}
                        className="text-foreground-400 hover:text-danger"
                      />
                    </Button>
                  </div>
                  {card.description && (
                    <p className="mt-1 text-xs text-foreground-500">
                      {card.description}
                    </p>
                  )}
                  <span
                    className={
                      "mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium " +
                      priorityColors[card.priority]
                    }
                  >
                    {priorityLabels[card.priority]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add card modal / 新建任务弹窗 */}
      <Modal.Backdrop isOpen={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Container>
          <Modal.Dialog aria-label="新建任务" className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{"新建任务"}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <TextField isRequired>
                  <Label>{"任务标题"}</Label>
                  <Input
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    placeholder="输入任务标题"
                  />
                </TextField>
                <Select
                  value={newCardPriority}
                  onChange={(value) =>
                    setNewCardPriority(value as "high" | "medium" | "low")
                  }
                >
                  <Label>{"优先级"}</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="high" textValue="高">
                        {"高"}
                      </ListBox.Item>
                      <ListBox.Item id="medium" textValue="中">
                        {"中"}
                      </ListBox.Item>
                      <ListBox.Item id="low" textValue="低">
                        {"低"}
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <TextField>
                  <Label>{"任务描述"}</Label>
                  <TextArea
                    value={newCardDesc}
                    onChange={(e) => setNewCardDesc(e.target.value)}
                    placeholder="输入任务描述"
                  />
                </TextField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="ghost">
                {"取消"}
              </Button>
              <Button onPress={confirmAdd}>{"创建"}</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </BuiPage>
  );
};
export function Component() {
  return <KanbanBoard />;
}
