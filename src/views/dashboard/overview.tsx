/**
 * Dashboard Overview page / 看板概览页面
 * Summary stats + visx bar chart for monthly activity.
 */

import { useRef, useState, useEffect } from "react";
import { BuiPage } from "../../components/baseui";
import { useSetPageTitle } from "../../stores";
import { Card, Button } from "@heroui/react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { UserPlus, FileDown, Send, Settings } from "lucide-react";

const activityData = [
  { label: "2月", value: 420 },
  { label: "3月", value: 560 },
  { label: "4月", value: 490 },
  { label: "5月", value: 610 },
  { label: "6月", value: 720 },
  { label: "7月", value: 650 },
];

const CHART_HEIGHT = 220;
const CHART_MARGIN = { top: 8, right: 8, bottom: 28, left: 40 };

const ActivityBarChart = () => {
  const chartRef = useRef<HTMLDivElement>(null!);
  const [width, setWidth] = useState(400);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  useEffect(() => {
    const measure = () => {
      if (chartRef.current) {
        const w = chartRef.current.offsetWidth;
        if (w > 0) setWidth(w);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  const xMax = width - CHART_MARGIN.left - CHART_MARGIN.right;
  const yMax = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom;

  const xScale = scaleBand({
    domain: activityData.map((d) => d.label),
    range: [0, xMax],
    padding: 0.4,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...activityData.map((d) => d.value)) * 1.15],
    range: [yMax, 0],
  });

  return (
    <div ref={chartRef} className="w-full">
      <svg width={width} height={CHART_HEIGHT}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.85} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
          {yScale.ticks(5).map((tick) => (
            <g key={tick}>
              <line
                x1={0}
                x2={xMax}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={-8}
                y={yScale(tick)}
                textAnchor="end"
                alignmentBaseline="middle"
                fill="var(--muted)"
                fontSize={12}
              >
                {tick}
              </text>
            </g>
          ))}
          {activityData.map((d) => {
            const isHovered = hoveredLabel === d.label;
            return (
              <Bar
                key={d.label}
                x={xScale(d.label)}
                y={yScale(d.value)}
                width={xScale.bandwidth()}
                height={yMax - yScale(d.value)}
                fill="url(#barGrad)"
                rx={4}
                opacity={hoveredLabel !== null && !isHovered ? 0.35 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.15s ease" }}
                onMouseEnter={() => setHoveredLabel(d.label)}
                onMouseLeave={() => setHoveredLabel(null)}
              />
            );
          })}
          {hoveredLabel !== null &&
            activityData
              .filter((d) => d.label === hoveredLabel)
              .map((d) => (
                <text
                  key={`tip-${d.label}`}
                  x={(xScale(d.label) ?? 0) + xScale.bandwidth() / 2}
                  y={yScale(d.value) - 8}
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize={13}
                  fontWeight={700}
                >
                  {d.value}
                </text>
              ))}
          {activityData.map((d) => (
            <text
              key={d.label}
              x={(xScale(d.label) ?? 0) + xScale.bandwidth() / 2}
              y={yMax + 18}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize={12}
            >
              {d.label}
            </text>
          ))}
        </Group>
      </svg>
    </div>
  );
};

const DashboardOverview = () => {
  useSetPageTitle("看板概览", "欢迎使用 CatAdmin");
  return (
    <BuiPage>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "总用户", value: "2,847", change: "+12.5%" },
          { label: "活跃会话", value: "182", change: "+3.2%" },
          { label: "收入", value: "$48,290", change: "+8.1%" },
          { label: "跳出率", value: "24.5%", change: "-2.4%" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <Card.Content>
              <p className="text-sm text-foreground-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground font-price">
                {stat.value}
              </p>
              <p
                className={`mt-1 text-sm ${stat.change.startsWith("+") ? "text-success" : stat.change.startsWith("-") ? "text-danger" : "text-foreground"}`}
              >
                {stat.change}
              </p>
            </Card.Content>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <Card.Header>
            <Card.Title>最近活动</Card.Title>
            <Card.Description>月度操作数量趋势</Card.Description>
          </Card.Header>
          <Card.Content>
            <ActivityBarChart />
          </Card.Content>
        </Card>
        <Card className="p-6">
          <Card.Header>
            <Card.Title>快捷操作</Card.Title>
            <Card.Description>常用管理入口</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="primary" className="w-full justify-start gap-2">
                <UserPlus size={18} />
                新建用户
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileDown size={18} />
                导出报表
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Send size={18} />
                发送通知
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings size={18} />
                系统设置
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </BuiPage>
  );
};

export default DashboardOverview;
