import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';
import * as d3 from 'd3';
import { forceSimulation } from 'd3-force';

export interface NodeData {
  id: number,
  data: string,
  x: number,
  y: number
}

export interface ForceLink {
  source: number,
  target: number
}

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit, AfterViewInit {
  command:string = "man Evan";
  location:string = "~/resume";

  // Variables for d3 graph.
  private width = 500;
  private height = 700;
  private svg: any;
  private linkSvg: any;
  private nodeSvg: any;
  private link: any;
  private g: any;
  private simulation: any;
  private links: Array<ForceLink> = [
    {
      source: 0,
      target: 1
    },
    {
      source: 0,
      target: 2
    },
    {
      source: 1,
      target: 2
    },
    {
      source: 3,
      target: 2
    }
  ];
  private nodes: Array<NodeData> = [
    {
      id: 0,
      data: "test0",
      x: 50,
      y: 50
    },
    {
      id: 1,
      data: "test1",
      x: 50,
      y: 50
    },
    {
      id: 2,
      data: "test2",
      x: 50,
      y: 50
    },
    {
      id: 3,
      data: "test3",
      x: 50,
      y: 50
    }
  ];

  constructor(private toolbarService:ToolbarService, private elem:ElementRef) { }

  ngOnInit(): void {
    this.toolbarService.changeDisplayInfo(this.location, this.command);
  }

  ngAfterViewInit(): void {
    // Set the width and height of the graph element.
    // this.width = this.elem.nativeElement.offsetWidth;
    // this.height = this.elem.nativeElement.offsetHeight;
    // Setup the SVG element the graph will be on.
    this.createSvg();
    this.makeGraph();
  }

  /**
  * Creates the SVG element that graph elements will be appended to.
  * Creats two sections one for link and one for nodes so nodes will all appear on top of links.
  */
  private createSvg(): void {
    this.svg = d3.select("div#graph")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height);
    this.linkSvg = this.svg.append("g").attr("id", "links")
    this.nodeSvg = this.svg.append("g").attr("id", "nodes");
  }

  /**
  * Create the graph initially. Initializes the simulation.
  */
  private makeGraph(): void {
    this.makeLinksAndNodes();

    this.initializeSimulation();

    this.simulation.nodes(this.nodes);
    this.simulation.force("link").links(this.links);
    this.simulation.alpha(.6).restart();
  }

  /**
   * Initializes the simulation. 
   */
  private initializeSimulation() {
    this.simulation = forceSimulation(this.nodes)
    .force("link", d3.forceLink()
    .links(this.links)
    )
    // .force("charge", d3.forceManyBody().strength(300))
    // .force("x", d3.forceX().x(this.width/2))
    // .force("y", d3.forceY().y(this.height/2))
    .force("collision", d3.forceCollide().radius(30))
    .on("tick", () => this.tick());
  }

  private makeLinksAndNodes() {
    // Initialize or update the links.
    this.link = this.linkSvg
    .selectAll("line")
    .data(this.links, (l: any) => {return l.source + l.target;})
    .join("line")
    .style("stroke", "WHITE")
    .style("stroke-width", "3px")
    // Show an indication when the mouse is over a line.
    .on("mouseover", (d:any) => {
      d3.select(d.target).attr("class", "hover-indication");
    })
    .on("mouseout", (d:any) => {
      d3.select(d.target).attr("class", "")
    });

    // Initialize or update the nodes.
    this.g = this.nodeSvg
    .selectAll("g")
    .data(this.nodes, (d: any) => {
      return d.id;
    })
    .join(
      // Enter is for new nodes.
      (enter: any) => { 
        return enter.append("g")
        .call((parent: any) => {
          // Append a circle element to each node.
          parent.append("circle")
          .attr("r", 20)
          .style("fill", "RED")
            .attr("class", "node-border")
            // Show an indication when the mouse is over a circle.
            .on("mouseover", (d:any) => {
              d3.select(d.target).attr("class", "hover-indication node-border");
            })
            .on("mouseout", (d:any) => {
              d3.select(d.target).attr("class", "node-border")
            });

            // Append some text to the node. Either ip, server name, or program name.
            parent.append("text")
            .style("fill", "WHITE")
            .text((d: NodeData) => {
                  return d.data;
                }
              )
            // Show an indication when the mouse is over a circle.
            .on("mouseover", (d:any) => {
              d3.select(d.target.parentNode.firstChild).attr("class", "hover-indication node-border");
            })
            .on("mouseout", (d:any) => {
              d3.select(d.target.parentNode.firstChild).attr("class", "node-border")
            })
            // Place the text nicely in the middle of the node.
            .attr("dominant-baseline", "middle")
            .attr("text-anchor", "middle")
            // Vary the size of the text depending on the size of the node.
            .style("font-size", 20);
            });
          });
      }

  /**
   * Called by the simulation for behavior each tick. Updates the node and link positions.
   * Nodes are bound to the graph area so they cannot move off the screen.
   */
  private tick() {
    // Update the link svg position.
    this.link
    .attr("x1", (d: { source: { x: any; }; }) => {
      var x = d.source.x;
      d.source.x = x;
      return x; 
    })
    .attr("y1", (d: { source: { y: any; }; }) => {
      var y = d.source.y;
      d.source.y = y;
      return y;
    })
    .attr("x2", (d: { target: { x: any; }; }) => {
      var x = d.target.x;
      d.target.x = x;
      return x;
    })
    .attr("y2", (d: { target: { y: any; }; }) => {
      var y = d.target.y;
      d.target.y = y;
      return y; 
    });

    // Update the node position. 
    // Uses translate because g svg elements do not have coordinate attributes.
    this.g
    .attr("transform", (d: NodeData) => {
      return "translate(" + d.x + "," + d.y + ")"
    })
  }
}
