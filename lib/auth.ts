import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.DB_URL!)
const db = client.db("job-app")

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

const roles = ["seeker", "recruiter", "admin"] as const

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "seeker",
        // Allow the value to be sent from sign-up; anything unknown is
        // coerced back to "seeker" so clients can't invent roles.
        input: true,
        transform: {
          input: (value) =>
            roles.includes(value as (typeof roles)[number]) ? value : "seeker",
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,

  // Only register Google when credentials exist, otherwise Better Auth warns
  // and the provider is unusable anyway.
  socialProviders:
    googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {},
})
