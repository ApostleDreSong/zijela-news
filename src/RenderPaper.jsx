import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import he from 'he';
import Share from './Share';

const styles = {
    rel:{
        position: 'relative',
    },
    title: {
        cursor: 'pointer',
        padding: '20px',
        backgroundColor: '#3f51b5',
        color: 'white',
    },
    shareCont:{
        backgroundColor: 'white',
        borderRadius: '50%',
        position: 'absolute',
        right: '-7px',
        bottom: '-7px'
    }
}

function RenderPaper(props) {
    var [content, setContent] = useState([]);
    const { url, paperName } = props;
    const zijelaUrl = "http://news.zijela.com"

    function goToSite(newsUrl) {
        window.open(
            newsUrl, "_blank");
    }

    useEffect(() => {
        let mounted = true;
        axios.get(`${url}/wp-json/wp/v2/posts?per_page=30`)
            .then(function (response) {
                if (mounted) {
                    setContent(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        return () => {
            mounted = false;
        };
    }, [url, content.length]);
    return <div>

        <Divider />
        {
            content.map((news, index) => (
                <div key={index}>
                    <div style={styles.rel}>
                    <p style={styles.title} onClick={() => goToSite(news['guid']['rendered'])}>
                        {he.decode(news['title'].rendered)}
                    </p>
                        <div style={styles.shareCont}>
                            <Share url={zijelaUrl} title={he.decode(news['title'].rendered)} paper={paperName}/>
                        </div>
                    </div>
                    <Divider />
                </div>
            ))
        }
        <p>
            These news highlights are gotten from {url}. To read more stories from {paperName}, <a href={url} target="_blank" rel="noopener noreferrer">click here</a>
        </p>


    </div>
}
export default RenderPaper;