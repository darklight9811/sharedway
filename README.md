# <img src="./public/images/logo/favicon.svg" width="24" /> Sharedway

[![Production](https://img.shields.io/badge/deployment-prod-3a506b?&style=for-the-badge&labelColor=dbf0fd)](https://sharedway.org)
[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://natural-iberis-96f.notion.site/3489c64422dc456b85d3b2f559d1fdca?v=fdaeb1a8cb38486194b66123c705ee7a&pvs=74)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/sharedway_org/)
[![X](https://img.shields.io/badge/X-%23000000.svg?style=for-the-badge&logo=X&logoColor=white)](https://x.com/darklight9811)

An application to help find missing people and animals. Serving as a central bank (or HUB) for institutions, the government and anyone can access the data. A difference is that it allows you to filter by region, so that you can see missing people or animals in the location with better distinction.

## Installation

> You will need to have API keys for: clerk, kv, uploadthing and a postgres database

- Clone this repository
- Run `bun install` on the root repository
- Create `.env` file from `.env.example` and populate it
- Run `bun db push`
- Populate with mock data using `bun db seed`
- Run `bun dev --filter=app`

## Powered by

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Railway](https://img.shields.io/badge/railway-801ae6?logo=railway&style=for-the-badge)](https://railway.app/)
[![Uploadthing](https://img.shields.io/badge/uploadthing-e91616?&style=for-the-badge)](https://uploadthing.com/)
[![Clerk](https://img.shields.io/badge/clerk-6c47ff?&logo=clerk&style=for-the-badge)](https://clerk.com/)
