<p align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=soft&height=210&color=0:191C1B,100:252D27&text=Joseph%20Sfeir&fontFamily=Georgia&fontColor=F1F2ED&fontSize=66&fontAlignY=42&desc=Software%20engineer%20from%20Zahle%2C%20Lebanon&descSize=19&descAlignY=67&animation=fadeIn" alt="Joseph Sfeir, software engineer from Zahle, Lebanon" />
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://readme-typing-svg.demolab.com/?font=Courier+Prime&weight=700&size=22&duration=3200&pause=1400&color=ABB0AA&center=true&vCenter=true&width=640&height=46&lines=Full-stack+engineer+at+Simly;Building+YallaHjoz%2C+table+bookings+for+Zahle;Building+Jay%2C+a+private+AI+operator;Studying+Computer+%26+Communications+Engineering" />
    <img src="https://readme-typing-svg.demolab.com/?font=Courier+Prime&weight=700&size=22&duration=3200&pause=1400&color=3B4731&center=true&vCenter=true&width=640&height=46&lines=Full-stack+engineer+at+Simly;Building+YallaHjoz%2C+table+bookings+for+Zahle;Building+Jay%2C+a+private+AI+operator;Studying+Computer+%26+Communications+Engineering" alt="Full-stack engineer at Simly. Building YallaHjoz and Jay. Studying Computer and Communications Engineering." />
  </picture>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/joseph-sfeir-416062261/"><img src="https://img.shields.io/badge/LinkedIn-191C1B?style=for-the-badge&logo=linkedin&logoColor=F1F2ED" alt="LinkedIn" /></a>
  <a href="mailto:josephssfeir@gmail.com"><img src="https://img.shields.io/badge/Email-303C2B?style=for-the-badge&logo=gmail&logoColor=F1F2ED" alt="Email" /></a>
  <a href="https://github.com/Systemizable"><img src="https://img.shields.io/badge/Earlier%20projects-373C38?style=for-the-badge&logo=github&logoColor=F1F2ED" alt="Earlier projects on the Systemizable account" /></a>
</p>

I'm Joseph. I write full-stack TypeScript at Simly, study Computer & Communications Engineering at Antonine University, and build a couple of products on the side. Most of that work lives in private repositories, so this page is the summary.

## What I'm working on

<h3>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/logos/simly-dark.svg" />
    <img src="./assets/logos/simly-light.svg" height="30" alt="Simly" />
  </picture>
</h3>

**Full-stack software engineer**

[Simly](https://www.simly.io/) is an eSIM marketplace with 3M+ users. I mostly build the internal tools its support and finance teams use, and I've started on Simly Concierge, a travel assistant.

- Built a CDR pipeline across all five eSIM providers (1Global, Telna, Bondio, Truphone, eSIM Go). It replaced manual imports and feeds usage, margin and heatmap analytics into Simly Desk.
- Led the rebuild of Simly Care, the customer care system: tickets, the provider relay and eSIM monitoring.
- Built Financial Advisor in Simly Desk, which tracks data usage, cost and user sessions from CDRs.
- Synced WhatsApp support chats from Rasayel into Simly's systems with webhooks and GraphQL.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=ts%2Cnodejs%2Cexpress%2Cmongodb%2Cgraphql&theme=dark" />
  <img src="https://skillicons.dev/icons?i=ts,nodejs,express,mongodb,graphql&theme=light" height="36" alt="TypeScript, Node.js, Express, MongoDB, GraphQL" />
</picture>

<h3>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/logos/yallahjoz-dark.svg" />
    <img src="./assets/logos/yallahjoz-light.svg" height="48" alt="YallaHjoz" />
  </picture>
</h3>

YallaHjoz ("let's book") is table reservations for restaurants in Zahle. Most of them still take bookings by phone or WhatsApp and write them in a notebook, and none of the booking apps we checked list the city.

- Every booking gets a QR code that the restaurant scans at the door.
- I built a working demo of the host stand: a phone web app for the door with tonight's list, check-ins, seated guests and no-shows.
- We designed the brand ourselves, from the Arabic calligraphy logo to the app icons.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=html%2Ccss%2Cjs&theme=dark" />
  <img src="https://skillicons.dev/icons?i=html,css,js&theme=light" height="36" alt="HTML, CSS, JavaScript" />
</picture>

<h3>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/logos/jay-dark.svg" />
    <img src="./assets/logos/jay-light.svg" height="20" alt="" />
  </picture>
  Jay
</h3>

**Private AI operator**

Jay is a single-user AI operator: one conversation for personal, business, creative and investment work. It's a TypeScript monorepo with a NestJS API, a Next.js app and Postgres with pgvector.

- Bookings, orders and anything destructive always ask for approval first, and every action goes into an append-only log.
- Memory is scoped to personal, business and investments, so one context can't leak into another.
- Background jobs on a Postgres queue flag what needs attention, grouped and rate-limited so they don't turn into noise.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=ts%2Cnestjs%2Cnextjs%2Cpostgres%2Cdocker&theme=dark" />
  <img src="https://skillicons.dev/icons?i=ts,nestjs,nextjs,postgres,docker&theme=light" height="36" alt="TypeScript, NestJS, Next.js, PostgreSQL, Docker" />
</picture>

## Tools I use

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=ts%2Cjs%2Cjava%2Cpython%2Ccpp%2Cnodejs%2Cnestjs%2Cexpress%2Cspring%2Creact%2Cnextjs%2Cpostgres%2Cmongodb%2Cmysql%2Cgraphql%2Cdocker%2Cgit%2Cpostman&perline=9&theme=dark" />
  <img src="https://skillicons.dev/icons?i=ts,js,java,python,cpp,nodejs,nestjs,express,spring,react,nextjs,postgres,mongodb,mysql,graphql,docker,git,postman&perline=9&theme=light" alt="TypeScript, JavaScript, Java, Python, C++, Node.js, NestJS, Express, Spring, React, Next.js, PostgreSQL, MongoDB, MySQL, GraphQL, Docker, Git, Postman" />
</picture>

## Activity

<img src="https://streak-stats.demolab.com/?user=Systemizables&border_radius=8&border=373C38&background=191C1B&stroke=373C38&ring=7E8E5F&fire=9AA77F&currStreakNum=F1F2ED&sideNums=F1F2ED&currStreakLabel=9AA77F&sideLabels=ABB0AA&dates=191C1B" alt="Joseph's GitHub contribution streak, including private contributions" />

## Earlier projects

From my first account, [Systemizable](https://github.com/Systemizable).

<p>
  <a href="https://github.com/Systemizable/JobPortal">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://socialify.git.ci/Systemizable/JobPortal/image?description=1&descriptionEditable=Spring%20Boot%20job%20board%20API%20with%20JWT%20auth%20and%20MongoDB&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Dark" />
      <img width="49%" src="https://socialify.git.ci/Systemizable/JobPortal/image?description=1&descriptionEditable=Spring%20Boot%20job%20board%20API%20with%20JWT%20auth%20and%20MongoDB&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Light" alt="JobPortal: Spring Boot job board API with JWT auth and MongoDB" />
    </picture>
  </a>
  <a href="https://github.com/Systemizable/election-analysis-predictor">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://socialify.git.ci/Systemizable/election-analysis-predictor/image?description=1&descriptionEditable=Zahle%20election%20data%3A%20turnout%2C%20coalitions%20and%20forecasts&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Dark" />
      <img width="49%" src="https://socialify.git.ci/Systemizable/election-analysis-predictor/image?description=1&descriptionEditable=Zahle%20election%20data%3A%20turnout%2C%20coalitions%20and%20forecasts&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Light" alt="Election analysis predictor: Zahle election data, turnout, coalitions and forecasts" />
    </picture>
  </a>
  <a href="https://github.com/Systemizable/SAA-Sports-Analysis-App">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://socialify.git.ci/Systemizable/SAA-Sports-Analysis-App/image?description=1&descriptionEditable=NBA%20and%20football%20stats%2C%20scraped%20and%20ranked%20into%20a%20GOAT%20list&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Dark" />
      <img width="49%" src="https://socialify.git.ci/Systemizable/SAA-Sports-Analysis-App/image?description=1&descriptionEditable=NBA%20and%20football%20stats%2C%20scraped%20and%20ranked%20into%20a%20GOAT%20list&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Light" alt="Sports analysis app: NBA and football stats, scraped and ranked into a GOAT list" />
    </picture>
  </a>
  <a href="https://github.com/Systemizable/agricrop">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://socialify.git.ci/Systemizable/agricrop/image?description=1&descriptionEditable=A%20community%20site%20where%20farmers%20advertise%20their%20produce&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Dark" />
      <img width="49%" src="https://socialify.git.ci/Systemizable/agricrop/image?description=1&descriptionEditable=A%20community%20site%20where%20farmers%20advertise%20their%20produce&font=Bitter&language=1&name=1&owner=0&pattern=Plus&theme=Light" alt="AgriCrop: a community site where farmers advertise their produce" />
    </picture>
  </a>
</p>

<details>
<summary><b>Education and a bit more about me</b></summary>
<br />

- **Antonine University** · BE in Computer & Communications Engineering, Software Engineering track
- **Debate club founder** · Started my school's first official debate club. It's still running under a new student team.
- **Model United Nations** · Delegate on the UNEP committee, then advisor to five new delegates. Two won Best Position Paper and two won Diplomacy Awards.
- **Certificates** · Cisco Networking Academy (Networks, Routing & Switching, Scaling Networks, Cybersecurity, IoT, Data Science) and DataCamp AI Fundamentals
- **Languages** · Arabic, English, French, and some Spanish

</details>

<img width="100%" src="https://capsule-render.vercel.app/api?type=wave&height=120&color=0:303C2B,100:202823&section=footer" alt="" />
