export interface Node {
  name: string,
  details: Array<string>,
  radius: number,
  x: number,
  y: number
}

export interface ForceLink {
  source: string,
  target: string
}

export interface NodeData {
  name: string,
  details: Array<string>,
  children: Array<NodeData>
}

export class ResumeData {
  public links: Array<ForceLink> = [];
  public nodes: Array<Node> = [];
  private resumeData: Array<NodeData> = [
    {
      name: "Education",
      details: [
        "*Eductation",
        "-Graduate Degree in Software Engineering",
        "In Progress",
        "Expected graduation May 2023",
        " ",
        "-BS in Computer Science",
        "With an emphasis in Security",
        "Minor: Mathematics",
        "From: University of Wisconsin, La Crosse",
        "Graduated May 2022"
      ],
      children: [
        {
          name: "Bachelors in CS",
          details: [
            "*Bachelors of Science",
            "-In Computer Science",
            "With an emphasis in Security",
            "Minor: Mathematics",
            "From: University of Wisconsin, La Crosse",
            "Graduated May 2022",
            "GPA:"
          ],
          children: []
        },
        {
          name: "Graduate in Software Engineering (in progress)",
          details: [
            "*Graduate Degree",
            "*Software Engineering",
            "In Progress",
            "Expected graduation May 2023"
          ],
          children: []
        }
      ]
    },
    {
      name: "Projects",
      details: [],
      children: [
        {
          name: "RemoraFish",
          details: [
            "*RemoraFish",
            "The Capstone for my Grad Degree.",
            "A network analysis tool that creates "
            + "a graph a lot like this one showing the "
            + "network activity it is running on.",
            "You can find both parts of the project on my github:",
            ":https://github.com/emwitth/capstone-frontend",
            ":https://github.com/emwitth/capstone-backend"
          ],
          children: []
        },
        {
          name: "TwixtApp",
          details: [
            "*TwixT App",
            "Twixt is a cool game made in the 1962.",
            ":https://en.wikipedia.org/wiki/Twixt",
            " ",
            "I found it once at a friends house and fell in love.",
            "It is out of print, so nobody has heard of it.",
            "The current TwixT app in the Google app store is old and sucks "
            + "so I thought I'd try my hand.",
            " ",
            "You can find the code on my github:",
            ":https://github.com/emwitth/TWIXTapp"
          ],
          children: []
        },
        {
          name: "And More",
          details: [],
          children: []
        }
      ]
    },
    {
      name: "Work Experience",
      details: [],
      children:[
        {
          name: "CS Work",
          details: [],
          children: [
            {
              name: "Software Development Intern",
              details: [],
              children: []
            }
          ]
        },
        {
          name: "Non-CS Work",
          details: [],
          children: [
            {
              name: "Guest Service Desk",
              details: [],
              children: []
            },
            {
              name: "Front Desk Assistant",
              details: [],
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
        target: nodeInfo.name
      });
    }
    
    let node:Node = {
      name: nodeInfo.name,
      details: nodeInfo.details,
      radius: depth == 0 ? 80 : (depth == 1 ? 60 : 30),
      x: 0,
      y: 0
    };
    this.nodes.push(node);

    nodeInfo.children.forEach((child:NodeData) => {
      this.addNode(child, nodeInfo.name, depth+1);
    });
  }

}