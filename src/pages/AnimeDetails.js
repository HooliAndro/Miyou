import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function AnimeDetails() {
  let slug = useParams().slug;
  const [animeDetails, setAnimeDetails] = useState([]);
  useEffect(() => {
    getAnimeDetails();
  }, []);

  async function getAnimeDetails() {
    let res = await axios.get(
      `https://miyou-api.herokuapp.com/api/getanime?link=/category/${slug}`
    );
    setAnimeDetails(res.data);
  }
  return (
    <div>
      <Content>
        {animeDetails.length > 0 && (
          <div>
            <Banner
              src={
                animeDetails[0].anilistResponse !== "NONE" &&
                animeDetails[0].anilistResponse.anilistBannerImage !== null
                  ? animeDetails[0].anilistResponse.anilistBannerImage
                  : "https://wallpapercave.com/wp/wp8048984.jpg"
              }
              alt=""
            />
            <ContentWrapper>
              <Poster>
                <img src={animeDetails[0].gogoResponse.image} alt="" />
                <Button
                  to={"/watch" + animeDetails[0].gogoResponse.episodes[0]}
                >
                  Watch Now
                </Button>
              </Poster>
              <div>
                <h1>{animeDetails[0].gogoResponse.title}</h1>
                <p>
                  <span>Type: </span>
                  {animeDetails[0].gogoResponse.type.replace("Type:", "")}
                </p>
                <p>
                  <span>Plot Summery: </span>
                  {animeDetails[0].gogoResponse.description.replace(
                    "Plot Summary:",
                    ""
                  )}
                </p>
                <p>
                  <span>Genre: </span>
                  {animeDetails[0].gogoResponse.genre.replace("Genre:", "")}
                </p>
                <p>
                  <span>Released: </span>
                  {animeDetails[0].gogoResponse.released.replace(
                    "Released:",
                    ""
                  )}
                </p>
                <p>
                  <span>Status: </span>
                  {animeDetails[0].gogoResponse.status.replace("Status:", "")}
                </p>
                <p>
                  <span>Number of Episodes: </span>
                  {animeDetails[0].gogoResponse.numOfEpisodes}
                </p>
              </div>
            </ContentWrapper>
            <Episode>
              <h2>Episodes</h2>
              <Episodes>
                {animeDetails[0].gogoResponse.episodes.map((item, i) => (
                  <EpisodeLink to={"/watch" + item}>
                    Episode {i + 1}
                  </EpisodeLink>
                ))}
              </Episodes>
            </Episode>
          </div>
        )}
      </Content>
    </div>
  );
}

const Episode = styled.div`
  margin: 0 4rem 0 4rem;
  padding: 2rem;
  outline: 2px solid #272639;
  border-radius: 0.5rem;
  color: white;

  h2 {
    font-size: 1.4rem;
    text-decoration: underline;
    margin-bottom: 1rem;
  }
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.9rem 2rem;
  font-family: "Gilroy-Medium", sans-serif;
  border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;
`;

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    font-family: "Gilroy-Regular", sans-serif;
    span {
      font-family: "Gilroy-Bold", sans-serif;
      color: white;
    }
    p {
      text-align: justify;
    }
    h1 {
      font-family: "Gilroy-Bold", sans-serif;
      color: white;
    }
  }
`;

const Poster = styled.div`
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    position: relative;
    top: -20%;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
`;

const Button = styled(Link)`
  font-size: 1.3rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #7676ff;
  font-family: "Gilroy-Bold", sans-serif;
  border-radius: 0.4rem;
  position: relative;
  top: -20%;
  white-space: nowrap;
`;

const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;
`;

export default AnimeDetails;