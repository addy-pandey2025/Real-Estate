import { Link } from 'react-router-dom'

function PageHero({ title, crumb }) {
  return (
    <section className="page-hero">
      <h1>{title}</h1>
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / {crumb}
      </div>
    </section>
  )
}

export default PageHero