## ⏩ Running Locally
### **Required Software**
|  Software  |       Version       |
| :--------: | :-----------------: |
|  Node.js   | v16.13.0 or greater |
| Discord.js | v13.1.0 or greater  |
|   Redis    |  v6.2.0 or greater  |

### **Installation Steps**
|       |                                             |                                         |
| :---: | :-----------------------------------------: | :-------------------------------------: |
|   1   |              Clone Repository               |  `git clone bakonpancakz/faxspittist`   |
|   2   |            Install Dependencies             |                 `npm i`                 |
|   3   | [Set Environment Variables](#⛰-environment) |                   N/A                   |
|   4   |              Start faxspittist              |               `npm start`               |
|   5   |           Invite your Discord bot           | Scopes: `bot` & `applications.commands` |


## 🏔️ Environment
```perl
FAX_TOKEN="<Discord Bot Token>" # https://discord.com/developers/applications
FAX_REDIS="<Redis URI>"         # Required for commands, will not run without
NODE_ENV="production"           # Optional, Errors will cause app to quit
```


## 🔐 Permissions
Bot requires **admin** to view hidden channels, and **applications.commands** to create its slash commands.


## ✍ Contributing
You may contribute anything to this project. 
After all, the world could use more positivity.