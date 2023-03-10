export interface Node {
  data: string,
  radius: number,
  x: number,
  y: number
}

export interface ForceLink {
  source: string,
  target: string
}

export interface NodeData {
  data: string,
  children: Array<NodeData>
}

export class ResumeData {
  public links: Array<ForceLink> = [];
  public nodes: Array<Node> = [];
  private resumeData: Array<NodeData> = [
    {
      data: "Education",
      children: [
        {
          data: "Bachelors in CS",
          children: []
        },
        {
          data: "Graduate in Software Engineering (in progress)",
          children: []
        }
      ]
    },
    {
      data: "Projects",
      children: [
        {
          data: "RemoraFish Capstone",
          children: []
        },
        {
          data: "TwixtApp",
          children: []
        },
        {
          data: "And More",
          children: []
        }
      ]
    },
    {
      data: "Work Experience",
      children:[
        {
          data: "CS Work",
          children: [
            {
              data: "Software Development Intern",
              children: []
            }
          ]
        },
        {
          data: "Non-CS Work",
          children: [
            {
              data: "Guest Service Desk",
              children: []
            },
            {
              data: "Front Desk Assistant",
              children: []
            }
          ]
        }
      ]
    }
  ];

  constructor(){
    this.resumeData.forEach((category:NodeData) => {
      this.addNode(category, "", 0);
    });
    console.log(this.nodes);
    console.log(this.links);
  }

  private addNode(nodeInfo:NodeData, parentId:string, depth:number) {
    if(parentId != "")
    {
      this.links.push({
        source: parentId,
        target: nodeInfo.data
      });
    }
    
    let node:Node = {
      data: nodeInfo.data,
      radius: depth == 0 ? 80 : (depth == 1 ? 60 : 30),
      x: 0,
      y: 0
    };
    this.nodes.push(node);

    nodeInfo.children.forEach((child:NodeData) => {
      this.addNode(child, nodeInfo.data, depth+1);
    });
  }

}