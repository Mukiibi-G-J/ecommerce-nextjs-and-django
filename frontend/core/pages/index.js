import {
  CardContent,
  Container,
  Card,
  CardMedia,
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  example: {
    color: "#ccc",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
  },
  cardMedia: {
    paddingTop: "140%",
  },
}));

function Home({ posts, categories }) {
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <Header data={categories} />
      {console.log(categories)}
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {/* {console.log(posts)} */}
            {posts.map((post) => (
              <>
                <Link
                  key={post.id}
                  href={`product/${encodeURIComponent(post.slug)}`}
                >
                  <Grid item xs={6} sm={4} md={3}>
                    <Card className={classes.card} elevation={0}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={post.product_image[0].image}
                        title="Image title"
                        alt={post.product_image[0].alt_text}
                      />
                      <CardContent>
                        <Typography gutterBottom component="p">
                          {post.title}
                        </Typography>
                        <Box component="p" fontSize={16} fontWeight={900}>
                          £{post.regular_price}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Link>
              </>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/api");
  const posts = await res.json();

  // http://127.0.0.1:8000/api/category
  const ress = await fetch("http://127.0.0.1:8000/api/category");
  const categories = await ress.json();

  return {
    props: {
      posts,
      categories,
    },
  };
}

export default Home;
