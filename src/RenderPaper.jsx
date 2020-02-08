import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import he from "he";
import Share from "./Share";
import PaperAccordion from "./PaperAccordion";
import LoaderModal from "./LoaderModal"


const styles = {
  rel: {
    position: "relative",
    padding: "20px",
    backgroundColor: "#3f51b5",
    marginBottom: "10px"
  },
  shareCont: {
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    right: "-7px",
    bottom: "-7px"
  }
};

function RenderPaper(props) {
  var [content, setContent] = useState([]);
  var [loading, setLoading] = useState(false);
  const { url, paperName } = props;
  const zijelaUrl = "http://news.zijela.com";

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    axios
      .get(`${url}/wp-json/wp/v2/posts?per_page=30`, {
        headers: { "Content-Type": "application/json" }
      })
      .then(function(response) {
        if (mounted) {
          setContent(response.data);
        }
        setLoading(false);
      })
      .catch(function(error) {
        setLoading(false);
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, [url, content.length]);
  return (
    <div>
      <LoaderModal loading={loading}/>
      <Divider />
      {content.map((news, index) => (
        <div key={index}>
          <div style={styles.rel}>
            <PaperAccordion
              title={he.decode(news["title"].rendered)}
              url={news["guid"]["rendered"]}
              content={he.decode(news["content"].rendered.replace(/<img[^>]*>/g,`Visit <a href=${news["guid"]["rendered"]}>${paperName}</a> to view this image`))}
            />
            <div style={styles.shareCont}>
              <Share
                url={zijelaUrl}
                title={he.decode(news["title"].rendered)}
                style={{ cursor: "pointer" }}
                paperName={paperName}
              />
            </div>
          </div>
          <Divider />
        </div>
      ))}
      <p>
        These news highlights are gotten from {url}. To read more stories from
        {paperName},
        <a href={url} target="_blank" rel="noopener noreferrer">
          click here
        </a>
      </p>
    </div>
  );
}
export default RenderPaper;
