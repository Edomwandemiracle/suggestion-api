import express, { Application, Request, Response } from "express"
import cors from "cors"

const app: Application = express()

// Parse JSON requests
app.use(express.json())

// Enable cors for all origins
app.use(cors())

const port = process.env.PORT || 3000

type Suggestion = {
  id: string;
  title: string;
  parentId: string | null;
}

const suggestions: Array<Suggestion> = [
  {
    id: 'football',
    title: "Football",
    parentId: null,
  },
  {
    id: 'premier-league',
    title: "Premier League",
    parentId: "football"
  },
  {
    id: 'liverpool',
    title: "liverpool",
    parentId: "premier-league"
  }, {
    id: 'man-utd',
    title: "Man. UTD",
    parentId: "premier-league"
  }, {
    id: 'man-city',
    title: "Man. City",
    parentId: "premier-league"
  },
  {
    id: 'serie-a',
    title: "Serie A",
    parentId: "football"
  },
  {
    id: 'milan',
    title: "Milan",
    parentId: "seria-a"
  },
  {
    id: 'inter',
    title: "Inter",
    parentId: "seria-a"
  },
  {
    id: 'juventus',
    title: "Juventus",
    parentId: "seria-a"
  },
  {
    id: 'books',
    title: "Books",
    parentId: null,
  },
  {
    id: 'investment',
    title: "Investment",
    parentId: "books",
  },

  {
    id: 'the-intelligent-investor-benjamin-graham',
    title: "The Intelligent Investor - Benjamin Graham",
    parentId: "investment"
  },
  {
    id: 'rich-dad-poor-dad-robert-kiyosaki',
    title: "Rich Dad, Poor Dad - Robert Kiyosaki",
    parentId: "investment",
  },
  {
    id: 'children',
    title: "Children",
    parentId: "books",
  },
  {
    id: 'momo-michael-ende',
    title: "Momo - Micahel Ende",
    parentId: "children"
  },
  {
    id: 'bfg-roald-dahl',
    title: "BFG - Roald Dahl",
    parentId: "children",
  }
]

type User = {
  id: string;
  name: string;
}

const users: Array<User> = [
  {
    id: "miracle",
    name: "Miracle E."
  },
  {
    id: "john",
    name: "John D."
  },
  {
    id: "josh",
    name: "Josh S."
  },
  {
    id: "jane",
    name: "Jane F."
  }
]

function getUser(): User {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

function getSuggestionsByParentID(parentId: string | null): Array<Suggestion> {
  const _suggestions: Array<Suggestion> = []


  suggestions.forEach(suggestion => {
    if (parentId == suggestion.parentId) {
      _suggestions.push(suggestion)
    }
  })

  return _suggestions;
}

function suggestionExists(id: string): boolean {
  return suggestions.some(suggestion => suggestion.id == id)
}


// Get API Status
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: Date.now()
  })
})

// Get Random User
app.get('/users/random', (req: Request, res: Response) => {
  res.json(getUser())
})

// Get All Suggestions
app.get('/suggestions', (req: Request, res: Response) => {
  res.json(getSuggestionsByParentID(null))
})


// Get All Suggestions by Parent ID
app.get('/suggestions/:parentId', (req: Request, res: Response) => {
  const parentId = req.params.parentId

  if(!suggestionExists(parentId)) {
    return res.status(404).json({
      message: "Suggestion does not exist"
    })
  }

  res.json(getSuggestionsByParentID(parentId))
})

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
