/**
 * Dashboard Analytics page / 鐪嬫澘鍒嗘瀽椤甸潰
 * Traffic area chart + top pages list using visx.
 * / 娴侀噺瓒嬪娍闈㈢Н鍥?+ 热门页面鎺掕銆?
 */

import { useRef, useState, useEffect, useMemo } from 'react';
import { BuiPage } from '../../components/baseui';
import { Card, Chip } from '@heroui/react';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { curveMonotoneX } from '@visx/curve';

/** Mock weekly traffic data for 12 weeks / 12鍛ㄦ祦閲忔ā鎷熸暟鎹?*/
const trafficData = [
  { date: new Date(2026, 3, 1), value: 820 },
  { date: new Date(2026, 3, 8), value: 940 },
  { date: new Date(2026, 3, 15), value: 880 },
  { date: new Date(2026, 3, 22), value: 1030 },
  { date: new Date(2026, 4, 1), value: 1100 },
  { date: new Date(2026, 4, 8), value: 980 },
  { date: new Date(2026, 4, 15), value: 1150 },
  { date: new Date(2026, 4, 22), value: 1240 },
  { date: new Date(2026, 5, 1), value: 1180 },
  { date: new Date(2026, 5, 8), value: 1320 },
  { date: new Date(2026, 5, 15), value: 1280 },
  { date: new Date(2026, 5, 22), value: 1400 },
];

const CHART_HEIGHT = 260;
const CHART_MARGIN = { top: 8, right: 8, bottom: 28, left: 44 };

/** Top pages data / 热门页面鎺掕 */
const topPages = [
  { path: '/dashboard', visits: '2,847', change: '+12.5%', trend: 'up' },
  { path: '/users', visits: '1,892', change: '+8.3%', trend: 'up' },
  { path: '/reports', visits: '967', change: '+15.7%', trend: 'up' },
  { path: '/settings', visits: '1,256', change: '-2.1%', trend: 'down' },
  { path: '/analytics', visits: '643', change: '+5.4%', trend: 'up' },
];

const formatDate = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日`

const TrafficAreaChart = () => {
  const chartRef = useRef<HTMLDivElement>(null!);
 const [width, setWidth] = useState(500);
  const svgRef = useRef<SVGSVGElement>(null!);
  const [hoveredPoint, setHoveredPoint] = useState<{ date: Date; value: number } | null>(null);

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

  const xScale = useMemo(() => scaleTime({
    domain: [trafficData[0].date, trafficData[trafficData.length - 1].date],
    range: [0, xMax],
  }), [xMax]);

  const yScale = useMemo(() => scaleLinear({
    domain: [0, Math.max(...trafficData.map(d => d.value)) * 1.15],
    range: [yMax, 0],
  }), [yMax]);

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - CHART_MARGIN.left;
    const date = xScale.invert(mouseX);
    const closest = trafficData.reduce((prev, curr) =>
      Math.abs(+curr.date - +date) < Math.abs(+prev.date - +date) ? curr : prev
    );
    setHoveredPoint(closest);
  };

  const handleSvgMouseLeave = () => setHoveredPoint(null);

  return (
    <div ref={chartRef} className="w-full">
      <svg ref={svgRef} width={width} height={CHART_HEIGHT}
        onMouseMove={handleSvgMouseMove}
        onMouseLeave={handleSvgMouseLeave}
        style={{ cursor: 'crosshair' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Group left={CHART_MARGIN.left} top={CHART_MARGIN.top}>
          {yScale.ticks(5).map(tick => (
            <g key={tick}>
              <line x1={0} x2={xMax} y1={yScale(tick)} y2={yScale(tick)}
                stroke="var(--border)" strokeWidth={1} />
              <text x={-8} y={yScale(tick)} textAnchor="end"
                alignmentBaseline="middle" fill="var(--muted)" fontSize={12}>
                {tick}
              </text>
            </g>
          ))}
          <AreaClosed
            data={trafficData}
            x={d => xScale(d.date) ?? 0}
            y={d => yScale(d.value)}
            yScale={yScale}
            fill="url(#areaGrad)" />
          <LinePath
            data={trafficData}
            x={d => xScale(d.date) ?? 0}
            y={d => yScale(d.value)}
             stroke="var(--accent)" strokeWidth={2} curve={curveMonotoneX} />
          {hoveredPoint && (
            <g>
              <line x1={xScale(hoveredPoint.date) ?? 0} y1={0}
                x2={xScale(hoveredPoint.date) ?? 0} y2={yMax}
                stroke="var(--accent)" strokeWidth={1} strokeDasharray="4,3" />
              <circle cx={xScale(hoveredPoint.date) ?? 0}
                cy={yScale(hoveredPoint.value)}
                r={4} fill="var(--accent)" stroke="white" strokeWidth={2} />
              <rect
                x={(xScale(hoveredPoint.date) ?? 0) - 36}
                y={yScale(hoveredPoint.value) - 32}
                width={72} height={24} rx={4}
                fill="var(--surface)" stroke="var(--border)" />
              <text x={xScale(hoveredPoint.date) ?? 0}
                y={yScale(hoveredPoint.value) - 18}
                textAnchor="middle" fill="var(--foreground)" fontSize={11} fontWeight={600}>
                {hoveredPoint.value}
              </text>
            </g>
          )}
          {trafficData.filter((_, i) => i % 2 === 0).map(d => (
            <text key={+d.date}
              x={xScale(d.date) ?? 0} y={yMax + 18}
              textAnchor="middle" fill="var(--muted)" fontSize={11}>
              {formatDate(d.date)}
            </text>
          ))}
        </Group>
      </svg>
    </div>
  );
};

const DashboardAnalytics = () => (
  <BuiPage >
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="p-6 lg:col-span-2">
        <Card.Header>
          <Card.Title>流量概览</Card.Title>
          <Card.Description>周流量数据可视化</Card.Description>
        </Card.Header>
        <Card.Content><TrafficAreaChart /></Card.Content>
      </Card>
      <Card className="p-6">
        <Card.Header>
          <Card.Title>热门页面</Card.Title>
          <Card.Description>访问量最高的页面</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {topPages.map(page => (
              <div key={page.path} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{page.path}</p>
                  <p className="text-xs text-foreground-400">{page.visits} 次访问</p>
                </div>
                <Chip
                  size="sm"
                  variant="soft"
                  color={page.trend === 'up' ? 'success' : 'danger'}>
                  {page.change}
                </Chip>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  </BuiPage>
);

export default DashboardAnalytics;
