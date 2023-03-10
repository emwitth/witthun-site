import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';
import * as d3 from 'd3';
import { forceSimulation } from 'd3-force';
import { Node, ResumeData } from './resume-items';

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

  details:Array<string> = ["Click a node to see more about it."];

  constructor(private toolbarService:ToolbarService, private elem:ElementRef, private resume:ResumeData) { }

  ngOnInit(): void {
    this.toolbarService.changeDisplayInfo(this.location, this.command);
  }

  ngAfterViewInit(): void {
    // Set the width and height of the graph element.
    this.width = this.elem.nativeElement.offsetWidth;
    this.height = this.elem.nativeElement.offsetHeight;
    console.log(this.width);
    console.log(this.height);
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

    this.simulation.nodes(this.resume.nodes);
    this.simulation.force("link").links(this.resume.links);
    this.simulation.alpha(.6).restart();
  }

  /**
   * Initializes the simulation. 
   */
  private initializeSimulation() {
    console.log(this.resume.nodes);
    this.simulation = forceSimulation(this.resume.nodes)
    .force("link", d3.forceLink()
    .id(d => { return (d as Node).name; })
    .links(this.resume.links)
    )
    // .force("charge", d3.forceManyBody().strength(300))
    // .force("x", d3.forceX().x(this.width/2))
    // .force("y", d3.forceY().y(this.height/2))
    .force("collision", d3.forceCollide().radius(d => { return (d as Node).radius + 15;}))
    .on("tick", () => this.tick());
  }

  private makeLinksAndNodes() {
    this.resume.nodes.forEach(node => {
      node.x = this.width/2;
      node.y = this.height/2;
    });

    // Initialize or update the links.
    this.link = this.linkSvg
    .selectAll("line")
    .data(this.resume.links, (l: any) => {return l.source + l.target;})
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
    .data(this.resume.nodes, (d: any) => {
      return d.data;
    })
    .join(
      // Enter is for new nodes.
      (enter: any) => { 
        return enter.append("g")
        .on("click", (d:any) => {
          console.log(d);
          this.details = (d.target.__data__ as Node).details;
        })
        // Allow user to drag. Needed because sometimes the force sim kinda sucks.
        .call(this.drag())
        .call((parent: any) => {
          // Append a circle element to each node.
          parent.append("circle")
          .attr("r", (d: Node) => d.radius)
          .style("fill", "GREEN")
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
            .text((d: Node) => {
                  return d.name;
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
            .style("font-size", (d:Node) => {
              return (d.radius/10) + 10;
            });
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
      var x = this.boundX(d.source.x, 0);
      d.source.x = x;
      return x; 
    })
    .attr("y1", (d: { source: { y: any; }; }) => {
      var y = this.boundY(d.source.y, 0);
      d.source.y = y;
      return y;
    })
    .attr("x2", (d: { target: { x: any; }; }) => {
      var x = this.boundX(d.target.x, 0);
      d.target.x = x;
      return x;
    })
    .attr("y2", (d: { target: { y: any; }; }) => {
      var y = this.boundY(d.target.y, 0);
      d.target.y = y;
      return y; 
    });

    // Update the node position. 
    // Uses translate because g svg elements do not have coordinate attributes.
    this.g
    .attr("transform", (d: Node) => {
      var x = this.boundX(d.x, d.radius);
      var y = this.boundY(d.y, d.radius);
      d.x = x;
      d.y = y;
      return "translate(" + d.x + "," + d.y + ")"
    })
  }

    /**
   * Called to implement dragging nodes.
   * 
   * @returns the d3 drag behavior.
   */
    private drag() {
      return d3.drag()
      .on("start", event => {
        if(!event.active) this.simulation.alphaTarget(0.1).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on("drag", event => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", event => {
        if(!event.active) this.simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });
    }

  /**
   * Calculates the y position and adjusts if it is outside the bound of the graph area.
   * 
   * @param y the y position of a node
   * @param r the radius of the node
   * @returns the new position of y that is within the graph area (adjusted by the size of the node)
   */
  private boundY(y:number|null|undefined, r:number): number {
    return Math.max(r, Math.min(this.height-r, y ? y : 0));
  }

  /**
   * Calculates the x position and adjusts if it is outside the bound of the graph area.
   * 
   * @param x the x position of a node
   * @param r the radius of the node
   * @returns the new position of x that is within the graph area (adjusted by the size of the node)
   */
  private boundX(x:number|null|undefined, r:number): number {
    return Math.max(this.width*.25 + 10 + r, Math.min(this.width-r, x ? x : 0));
  }
}
