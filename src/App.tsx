
import { Header } from "./components/Header";
import styles from './App.module.css'
import './global.css'
import { Sidebar } from "./components/Sidebar";
import { Post, PostType } from "./components/Post";



const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/94937372?v=4",
      name: "Victor Aragão",
      role: "Web Developer",
    },
    content: [
      { type: 'paragraph', content: "Fala galeraa 👋" },
      { type: 'paragraph', content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date('2023-05-24 20:30:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/83376338?v=4",
      name: "Daniel Aragão",
      role: "Mechanical Engineer",
    },
    content: [
      { type: 'paragraph', content: "Fala galeraa 👋" },
      { type: 'paragraph', content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date('2023-05-22 20:30:00'),
  }]

export function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post 
              key={post.id}
              post={post}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
