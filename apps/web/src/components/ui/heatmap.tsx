"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import * as React from "react"

export type HeatmapDatum = {
  date: string | Date
  value: number
  meta?: unknown
}

export type HeatmapCell = {
  date: Date
  key: string
  value: number
  level: number
  label: string
  disabled: boolean
  meta?: unknown
}

export type LegendConfig = {
  show?: boolean
  lessText?: React.ReactNode
  moreText?: React.ReactNode
  showArrow?: boolean
  placement?: "right" | "bottom"
  direction?: "row" | "column"
  showText?: boolean
  swatchSize?: number
  swatchGap?: number
  className?: string
}

export type AxisLabelsConfig = {
  show?: boolean
  showWeekdays?: boolean
  showMonths?: boolean
  weekdayIndices?: number[]
  monthFormat?: "short" | "long" | "numeric"
  minWeekSpacing?: number
  className?: string
}

export type HeatmapCalendarProps = {
  title?: string
  data: HeatmapDatum[]
  rangeDays?: number
  endDate?: Date
  weekStartsOn?: 0 | 1
  cellSize?: number
  cellGap?: number
  onCellClick?: (cell: HeatmapCell) => void
  levelClassNames?: string[]
  palette?: string[]
  legend?: boolean | LegendConfig
  axisLabels?: boolean | AxisLabelsConfig
  renderLegend?: (args: {
    levelCount: number
    levelClassNames: string[]
    palette?: string[]
    cellSize: number
    cellGap: number
  }) => React.ReactNode
  renderTooltip?: (cell: HeatmapCell) => React.ReactNode
  className?: string
}

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function addDays(d: Date, days: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + days)
  return x
}

function toKey(d: Date) {
  return d.toISOString().slice(0, 10)
}

function startOfWeek(d: Date, weekStartsOn: 0 | 1) {
  const x = startOfDay(d)
  const day = x.getDay()
  const diff = (day - weekStartsOn + 7) % 7
  x.setDate(x.getDate() - diff)
  return x
}

function getLevel(value: number) {
  if (value <= 0) return 0
  if (value <= 2) return 1
  if (value <= 5) return 2
  if (value <= 10) return 3
  return 4
}

function clampLevel(level: number, levelCount: number) {
  return Math.max(0, Math.min(levelCount - 1, level))
}

function bgStyleForLevel(level: number, palette?: string[]) {
  if (!palette?.length) return undefined
  const idx = clampLevel(level, palette.length)
  return { backgroundColor: palette[idx] }
}

function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function formatMonth(d: Date, fmt: "short" | "long" | "numeric") {
  if (fmt === "numeric") {
    const yy = String(d.getFullYear()).slice(-2)
    return `${d.getMonth() + 1}/${yy}`
  }
  return d.toLocaleDateString("pt-BR", { month: fmt })
}

function weekdayLabelForIndex(index: number, weekStartsOn: 0 | 1) {
  const actualDay = (weekStartsOn + index) % 7
  const base = new Date(Date.UTC(2024, 0, 7 + actualDay))
  return base.toLocaleDateString("pt-BR", { weekday: "short" }).toUpperCase()
}

export function HeatmapCalendar({
  title = "Activity",
  data,
  rangeDays = 365,
  endDate = new Date(),
  weekStartsOn = 1,
  cellSize = 12,
  cellGap = 4,
  onCellClick,
  levelClassNames,
  palette,
  legend = true,
  axisLabels = true,
  renderLegend,
  renderTooltip,
  className,
}: HeatmapCalendarProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState<number>(0)

  React.useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const levels = levelClassNames ?? [
    "bg-muted",
    "bg-primary/20",
    "bg-primary/35",
    "bg-primary/55",
    "bg-primary/75",
  ]

  const levelCount = palette?.length ? palette.length : levels.length

  const legendCfg: LegendConfig =
    legend === true ? {} : legend === false ? { show: false } : legend

  const axisCfg: AxisLabelsConfig =
    axisLabels === true
      ? {}
      : axisLabels === false
        ? { show: false }
        : axisLabels

  const showAxis = axisCfg.show ?? true
  const showWeekdays = axisCfg.showWeekdays ?? true
  const showMonths = axisCfg.showMonths ?? true
  const weekdayIndices = axisCfg.weekdayIndices ?? [1, 3, 5]
  const monthFormat = axisCfg.monthFormat ?? "short"
  const minWeekSpacing = axisCfg.minWeekSpacing ?? 3

  const end = startOfDay(endDate)
  const start = addDays(end, -(rangeDays - 1))

  const valueMap = React.useMemo(() => {
    const map = new Map<string, { value: number; meta?: unknown }>()
    for (const item of data) {
      const d = typeof item.date === "string" ? new Date(item.date) : item.date
      const key = toKey(d)
      const prev = map.get(key)
      const nextVal = (prev?.value ?? 0) + (item.value ?? 0)
      map.set(key, { value: nextVal, meta: item.meta ?? prev?.meta })
    }
    return map
  }, [data])

  const firstWeek = startOfWeek(start, weekStartsOn)
  const totalDays =
    Math.ceil((end.getTime() - firstWeek.getTime()) / 86400000) + 1
  const weeks = Math.ceil(totalDays / 7)

  const cells: HeatmapCell[] = []
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const date = addDays(firstWeek, w * 7 + d)
      const inRange = date >= start && date <= end
      const key = toKey(date)
      const v = inRange ? (valueMap.get(key)?.value ?? 0) : 0
      const meta = inRange ? valueMap.get(key)?.meta : undefined
      const lvl = inRange ? getLevel(v) : 0
      cells.push({
        date,
        key,
        value: v,
        level: clampLevel(lvl, levelCount),
        disabled: !inRange,
        meta,
        label: date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      })
    }
  }

  const columns: HeatmapCell[][] = []
  for (let i = 0; i < weeks; i++) {
    columns.push(cells.slice(i * 7, i * 7 + 7))
  }

  // Calcula cellSize dinamico baseado na largura disponível
  const weekdayLabelWidth = showAxis && showWeekdays ? 44 : 0
  const legendWidth = (legendCfg.show ?? true) ? 140 : 0
  const availableWidth = containerWidth - weekdayLabelWidth - legendWidth - 16 // 16 = gap
  const dynamicCellSize =
    containerWidth > 0 && weeks > 0
      ? Math.max(
          8,
          Math.floor((availableWidth - cellGap * (weeks - 1)) / weeks)
        )
      : cellSize

  const effectiveCellSize = containerWidth > 0 ? dynamicCellSize : cellSize

  const monthLabels = React.useMemo(() => {
    if (!showAxis || !showMonths)
      return [] as { colIndex: number; text: string }[]

    const labels: { colIndex: number; text: string }[] = []
    let lastLabeledWeek = -999

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i]
      const firstInCol = col.find((c) => !c.disabled)?.date ?? col[0].date
      const prevCol = i > 0 ? columns[i - 1] : null
      const prevFirst =
        prevCol?.find((c) => !c.disabled)?.date ?? prevCol?.[0]?.date
      const monthChanged = !prevFirst || !sameMonth(firstInCol, prevFirst)

      if (monthChanged && i - lastLabeledWeek >= minWeekSpacing) {
        labels.push({ colIndex: i, text: formatMonth(firstInCol, monthFormat) })
        lastLabeledWeek = i
      }
    }

    return labels
  }, [columns, showAxis, showMonths, monthFormat, minWeekSpacing])

  const showLegend = legendCfg.show ?? false
  const placement = legendCfg.placement ?? "right"
  const direction = legendCfg.direction ?? "row"
  const showText = legendCfg.showText ?? true
  const showArrow = legendCfg.showArrow ?? true
  const lessText = legendCfg.lessText ?? "Menos"
  const moreText = legendCfg.moreText ?? "Mais"
  const swatchSize = legendCfg.swatchGap ?? effectiveCellSize
  const swatchGap = legendCfg.swatchGap ?? cellGap

  const LegendUI = renderLegend ? (
    renderLegend({
      levelCount,
      levelClassNames: levels,
      palette,
      cellSize: effectiveCellSize,
      cellGap,
    })
  ) : !showLegend ? null : (
    <div className={cn("shrink-0", legendCfg.className)}>
      {showText ? (
        <div className="mb-2 text-xs whitespace-nowrap text-muted-foreground">
          {lessText} {showArrow ? <span aria-hidden>→</span> : null} {moreText}
        </div>
      ) : null}
      <div
        className={cn(
          "flex items-center",
          direction === "row" ? "flex-row" : "flex-col"
        )}
        style={{ gap: `${swatchGap}px` }}
      >
        {Array.from({ length: levelCount }).map((_, i) => {
          const cls = levels[clampLevel(i, levels.length)]
          return (
            <div
              key={i}
              className={cn("rounded-[3px]", !palette?.length && cls)}
              style={{
                width: swatchSize,
                height: swatchSize,
                ...(bgStyleForLevel(i, palette) ?? {}),
              }}
              aria-hidden="true"
            />
          )
        })}
      </div>
    </div>
  )

  const tooltipNode = (cell: HeatmapCell) => {
    if (renderTooltip) return renderTooltip(cell)
    if (cell.disabled) return "Fora do intervalo"
    const unit = cell.value === 1 ? "contribuição" : "contribuições"
    return (
      <div className="text-sm">
        <div className="font-medium">
          {cell.value} {unit}
        </div>
        <div className="text-muted-foreground">{cell.label}</div>
      </div>
    )
  }

  const gridWidth =
    containerWidth > 0
      ? containerWidth -
        (weekdayLabelWidth ? weekdayLabelWidth + 8 : 0) -
        (showLegend ? legendWidth + 16 : 0)
      : 0

  const colStep = effectiveCellSize + cellGap

  const realColStep =
    gridWidth > 0 && weeks > 1 ? gridWidth / (weeks - 1) : colStep

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent ref={containerRef}>
        <TooltipProvider delayDuration={80}>
          <div
            className={cn(
              "flex gap-4",
              placement === "bottom" ? "flex-col" : "flex-row items-start"
            )}
          >
            {/* Calendar area — ocupa todo espaço disponível */}
            <div className="min-w-0 flex-1">
              {/* Month labels */}
              {showAxis && showMonths ? (
                <div
                  className="flex items-end"
                  style={{
                    paddingLeft: weekdayLabelWidth ? weekdayLabelWidth + 8 : 0,
                  }}
                >
                  <div className="relative w-full" style={{ height: 18 }}>
                    {monthLabels.map((m) => (
                      <div
                        key={m.colIndex}
                        className="absolute text-xs text-muted-foreground"
                        style={{
                          left: m.colIndex * realColStep,
                          top: 0,
                        }}
                      >
                        {m.text}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex">
                {/* Weekday labels */}
                {showAxis && showWeekdays ? (
                  <div
                    className="mr-2 flex shrink-0 flex-col"
                    style={{ gap: `${cellGap}px` }}
                    aria-hidden="true"
                  >
                    {Array.from({ length: 7 }).map((_, rowIdx) => (
                      <div
                        key={rowIdx}
                        className="flex items-center justify-end text-xs text-muted-foreground"
                        style={{ width: 40, height: effectiveCellSize }}
                      >
                        {weekdayIndices.includes(rowIdx)
                          ? weekdayLabelForIndex(rowIdx, weekStartsOn)
                          : ""}
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Grid — distribui colunas uniformemente */}
                <div
                  className="flex flex-1 justify-between"
                  role="grid"
                  aria-label="Heatmap calendario"
                >
                  {columns.map((col, i) => (
                    <div
                      key={i}
                      className="flex flex-col"
                      style={{ gap: `${cellGap}px` }}
                      role="rowgroup"
                    >
                      {col.map((cell) => {
                        const cls =
                          levels[clampLevel(cell.level, levels.length)]
                        return (
                          <Tooltip key={`${cell.key}-${i}`}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                disabled={cell.disabled}
                                onClick={() =>
                                  !cell.disabled && onCellClick?.(cell)
                                }
                                className={cn(
                                  "rounded-[3px] ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                  !palette?.length && cls,
                                  cell.disabled &&
                                    "pointer-events-none cursor-default opacity-30"
                                )}
                                style={{
                                  width: effectiveCellSize,
                                  height: effectiveCellSize,
                                  ...(bgStyleForLevel(cell.level, palette) ??
                                    {}),
                                }}
                                aria-label={
                                  cell.disabled
                                    ? "Fora do intervalo"
                                    : `${cell.label}: ${cell.value}`
                                }
                                role="gridcell"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {tooltipNode(cell)}
                            </TooltipContent>
                          </Tooltip>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            {LegendUI}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
