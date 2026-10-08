// import { graphql } from "gatsby"
// import * as React from 'react'
// import { Card } from "../components/card"
// import Layout from '../components/layout'
// import { filterNodes } from "../helpers"
// import "../style/accueil.css"
// import "../style/cards.css"

// const CardsLayout = ({ data }) => {
//     const nodes = data.allMarkdownRemark.nodes.filter(n => !n.fields.slug.startsWith('_'))
//     return (
//         <Layout nodes={nodes}>
//             {/* petite astuce pour passer une fonction qui rend le composant actuel au layout pour que le layout puisse passer les paramètres nécessaires au filtrage*/}
//             {(toggleTag, tags, search) => {
//                 const filtered = filterNodes(nodes, search, tags);
//                 const description = nodes.filter(node => node.fields.slug === "")[0]
//                 return (
//                     <div>
//                         {
//                             description &&
//                             (<header id="cards-introduction">
//                                 <div
//                                     className="cards-introduction-content"
//                                     dangerouslySetInnerHTML={{ __html: description.html }}
//                                 />
//                             </header>
//                             )
//                         }
//                         <div id="cards-container">
//                             {filtered.map(el => <Card postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
//                         </div>
//                     </div>
//                 )
//             }
//             }
//         </Layout>
//     )
// }

// export const query = graphql`
//     query MyQuery($pageName: String = "") {
//         allMarkdownRemark(
//         sort: {fields: {date: DESC}},
//         filter: {fields: {collection: {eq: $pageName}}}
//         limit: 999
//         ) {
//         nodes {
//             html
//             frontmatter {
//             tags
//             title
//             author
//             abstract
//             sound
//             uuid
//             prettyName
//             }
//             fields {
//             collection
//             date(formatString: "DD MMMM, YYYY", locale: "fr")
//             slug
//             image {
//                     childImageSharp {
//                         gatsbyImageData(placeholder: TRACED_SVG, width: 400)
//                     }
//                 }
//             }
//             excerpt(pruneLength: 600)
//         }
//     }
// }
// `

// export default CardsLayout


import { graphql, Link } from "gatsby"
import * as React from 'react'
import { Card } from "../components/card"
import Layout from '../components/layout'
import { filterNodes } from "../helpers"
import "../style/accueil.css"
import "../style/cards.css"

const CardsLayout = ({ data, pageContext }) => {
    const nodes = data.allMarkdownRemark.nodes.filter(n => !n.fields.slug.startsWith('_'))
    const { year, pageName } = pageContext;

    // Detectamos si estamos en la vista de publicaciones
    const isPublications = pageName === "1_cards_publications" || pageName === "publications";

    return (
        <Layout nodes={nodes}>
            {(toggleTag, tags, search) => {
                const filtered = filterNodes(nodes, search, tags);
                const description = nodes.filter(node => node.fields.slug === "")[0]
                return (
                    <div>
                        {
                            description &&
                            (<header id="cards-introduction">
                                <div
                                    className="cards-introduction-content"
                                    dangerouslySetInnerHTML={{ __html: description.html }}
                                />
                            </header>
                            )
                        }

                        {/* Indicador de filtro por año si existe */}
                        {isPublications && year && (
                            <div style={{ margin: "1rem 0", textAlign: "center" }}>
                                <h3>Publicaciones del año: {year}</h3>
                                <Link to="/publications/">← Ver todos los años</Link>
                            </div>
                        )}

                        <div id="cards-container">
                            {filtered.map(el => <Card key={el.frontmatter.uuid || el.fields.slug} postData={el} toggleTag={toggleTag} selectedTags={tags} />)}
                        </div>
                    </div>
                )
            }}
        </Layout>
    )
}

export const query = graphql`
    query MyQuery($pageName: String = "", $year: String) {
        allMarkdownRemark(
            sort: {fields: {date: DESC}},
            filter: {
                fields: {collection: {eq: $pageName}},
                frontmatter: {year: {eq: $year}}
            }
            limit: 999
        ) {
            nodes {
                html
                frontmatter {
                    tags
                    title
                    author
                    abstract
                    sound
                    uuid
                    prettyName
                    year
                }
                fields {
                    collection
                    date(formatString: "DD MMMM, YYYY", locale: "fr")
                    slug
                    image {
                        childImageSharp {
                            gatsbyImageData(placeholder: TRACED_SVG, width: 400)
                        }
                    }
                }
                excerpt(pruneLength: 600)
            }
        }
    }
`

export default CardsLayout