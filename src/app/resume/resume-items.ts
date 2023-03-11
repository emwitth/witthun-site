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
        "+Masters Degree in Software Engineering",
        "In Progress",
        "Expected graduation May 2023",
        " ",
        "+BS in Computer Science",
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
            "+In Computer Science",
            "With an emphasis in Security",
            "Minor: Mathematics",
            "From: University of Wisconsin, La Crosse",
            "Graduated May 2022",
            "GPA:"
          ],
          children: []
        },
        {
          name: "Masters in Software Eng.",
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
      details: [
        "*Projects",
        "+RemoraFish (Capstone)",
        ":https://github.com/emwitth/capstone-frontend",
        ":https://github.com/emwitth/capstone-backend",
        " ",
        "+TwixTApp",
        ":https://github.com/emwitth/TWIXTapp",
        " ",
        "+This Website",
        ":https://github.com/emwitth/witthun-site",
        " ",
        "+Morriscare Nursing Agency",
        ":https://github.com/emwitth/morriscare",
        " ",
        "+Hotdraw",
        ":https://github.com/emwitth/hotdraw",
        " ",
        "+Etc",
        "A c-based chat server (unfinished)."
      ],
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
          name: "TwixTApp",
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
          name: "This Website",
          details: [
            "This website is built on Angular "
            +"and it's hosted on a rasperry pi 3 I won "
            +"during a coding competition in high school. "
            +"The system to make the graph is pretty cool, "
            +"and I also use similar code on my capstone. ",
            "I have plans to create a module just for making " 
            +"this graph, which uses d3, easier to make.",
            "You can find the code on my github:",
            ":https://github.com/emwitth/witthun-site"
          ],
          children: []
        },
        {
          name: "And More",
          details: [
            "My other less notable projects are... ",
            "A simple webapp for a nursing agency. "
            +"I developed the frontend and did my best "
            +"dealing with the backend without complaining. "
            +"I am happy with the look, but some of the functionality "
            +"could be improved.",
            ":https://github.com/emwitth/morriscare",
            "-----",
            "An implementation of hotdraw based on this paper:",
            ":https://dl.acm.org/doi/10.1145/3361149.3361185",
            "It isn't too fancy, but it was a lot of fun.",
            ":https://github.com/emwitth/hotdraw",
            "----",
            "A c-based chat server (unfinished)."
          ],
          children: []
        }
      ]
    },
    {
      name: "Work Experience",
      details: [
        "+Software Development Intern",
        "Where: Trane Technologies (LaCrosse)",
        "When: June 2021 - present",
        "----",
        "+Service Desk",
        "Where: Festival Foods (Baraboo, WI)",
        "When:May 2019 - January 2020",
        "----",
        "+Front Desk Assistant",
        "+Wentz Hall, La Crosse, WI",
        "Spring 2020",
        "+Reuter Hall, La Crosse, WI",
        "Fall 2020 - Spring 20201",
        "----",
        "+Pizza Ranch",
        "(front of house/register/pizza)",
        "Baraboo",
        "Summer 2017 - Winter 2020",
        "----",
        "+Summer Custodial Maintenance",
        "Baraboo School District",
        "Summer 2015 - 2018"
      ],
      children:[
        {
          name: "CS Work",
          details: [
            "*Software Development Intern",
            "----",
            "+Where: Trane Technologies (LaCrosse)",
            "+When: June 2021 - present",
            "Worked as a full stack intern online "
            +"developing proprietary webapp (dmc) for Trane Technologies.",
            "Worked with international developer team.",
            "Worked in a develompent team using Scrum."
          ],
          children: [
            {
              name: "Software Development Intern",
              details: [
                "*Software Development Intern",
                "----",
                "+Where: Trane Technologies (La Crosse, WI)",
                "+When: June 2021 - present",
                "Worked as a full stack intern online "
                +"developing proprietary webapp (dmc) for Trane Technologies.",
                "Worked with international developer team.",
                "Worked in a develompent team using Scrum."
              ],
              children: []
            }
          ]
        },
        {
          name: "Non-CS Work",
          details: [
            "+Service Desk",
            "Where: Festival Foods (Baraboo, WI)",
            "When:May 2019 - January 2020",
            "----",
            "+Front Desk Assistant",
            "+Wentz Hall, La Crosse, WI",
            "Spring 2020",
            "+Reuter Hall, La Crosse, WI",
            "Fall 2020 - Spring 20201",
            "----",
            "+Pizza Ranch",
            "(front of house/register/pizza)",
            "Baraboo",
            "Summer 2017 - Winter 2020",
            "----",
            "+Summer Custodial Maintenance",
            "Baraboo School District",
            "Summer 2015 - 2018"
          ],
          children: [
            {
              name: "Guest Service Desk",
              details: [
                "*Service Desk",
                "+Where: Festival Foods (Baraboo, WI)",
                "+When: May 2019 - January 2020",
                "Dealt with customers issues.",
                "Helped Manage cashier staff."
              ],
              children: []
            },
            {
              name: "Pizza Ranch",
              details: [
                "*Pizza Ranch",
                "+Where: Pizza Ranch (Baraboo, WI)",
                "+When: Summer 2017 - Winter 2020",
                "Pizza, Cash Register, Phones, Customer Service",
                "Maintain Buffets"
              ],
              children: []
            },
            {
              name: "Front Desk Assistant",
              details: [
                "*Front Desk Assistant",
                "+Where: Wentz Hall, La Crosse, WI",
                "When: Spring 2020",
                "+Were: Reuter Hall, La Crosse, WI",
                "When: Fall 2020-Spring 20201",
                "----",
                "Sorted mail, checked students in/out, "
                +"made and sold frozen pizzas, "
                +"and managed drunk kids some nights.",
                "Got payed to do homework, honestly."
              ],
              children: []
            },
            {
              name: "Summer Custodial Maintenance",
              details: [
                "*Summer Custodial Maintenance",
                "+Where: Baraboo School District (Baraboo, WI)",
                "+When: Summer 2015 - 2018",
                "Quickly clean and move furniture.",
                "Deep clean classrooms.",
                " ",
                "Note: Never look under a desk in an "
                +"elementary school unless you want nightmares."
              ],
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