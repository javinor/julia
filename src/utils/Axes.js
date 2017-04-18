'use strict'

import * as d3 from 'd3'

const padding = 40

export default class Axes {
  constructor ({center, xLength, yLength, distanceToPixelRatio}) {
    const height = window.innerHeight
    const width = window.innerWidth

    const paddingLength = padding * distanceToPixelRatio
    const xMin = center.x - (xLength / 2) + (2 * paddingLength)
    const xMax = center.x + (xLength / 2) - (2 * paddingLength)
    const yMin = center.y - (yLength / 2) + (2 * paddingLength)
    const yMax = center.y + (yLength / 2) - (2 * paddingLength)

    this.whiteAxis = (axis, g) => {
      g.call(axis)
      g.selectAll('.domain').attr('stroke', 'white')
      g.selectAll('line').attr('stroke', 'white')
      g.selectAll('text').attr('fill', 'white')
    }

    this.svgContainer = d3.select('#axes')
      .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')

    this.xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([padding, width - padding])

    this.xAxis = d3.axisTop()
      .tickPadding(6)
      .tickSize(6)
      .scale(this.xScale)

    this.xAxisGroup = this.svgContainer
      .append('g')
        .attr('transform', `translate(0, ${height - padding / 2})`)
        .call(this.whiteAxis.bind(null, this.xAxis))

    this.yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height - padding, padding])

    this.yAxis = d3.axisRight()
      .tickPadding(6)
      .tickSize(6)
      .scale(this.yScale)

    this.yAxisGroup = this.svgContainer
      .append('g')
        .attr('transform', `translate(${padding / 2},0)`)
        .call(this.whiteAxis.bind(null, this.yAxis))
  }
  render ({center, xLength, yLength, distanceToPixelRatio}) {
    const paddingLength = padding * distanceToPixelRatio
    const xMin = center.x - (xLength / 2) + paddingLength
    const xMax = center.x + (xLength / 2) - paddingLength
    const yMin = center.y - (yLength / 2) + paddingLength
    const yMax = center.y + (yLength / 2) - paddingLength

    this.xScale.domain([xMin, xMax])
    this.xAxis.scale(this.xScale)
    this.xAxisGroup.call(this.whiteAxis.bind(null, this.xAxis))

    this.yScale.domain([yMin, yMax])
    this.yAxis.scale(this.yScale)
    this.yAxisGroup.call(this.whiteAxis.bind(null, this.yAxis))
  }
}
