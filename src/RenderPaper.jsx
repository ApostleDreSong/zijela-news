import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import he from 'he';
import AdSense from 'react-adsense';

const styles = {
    title: {
        cursor: 'pointer',
        padding: '20px',
        backgroundColor: '#3f51b5',
        color: 'white',

    }
}

function RenderPaper(props) {
    var [content, setContent] = useState([]);
    const { url, paperName } = props;

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
                    <p style={styles.title} onClick={() => goToSite(news['guid']['rendered'])}>{he.decode(news['title'].rendered)}</p>
                    <Divider />
                </div>
            ))
        }
        <p>
            These news highlights are gotten from {url}. To read more stories from {paperName}, <a href={url} target="_blank" rel="noopener noreferrer">click here</a>
        </p>
        <div style={{ minWidth: "250px" }}>
            <AdSense.Google
                style={{ display: 'block' }}
                client="ca-pub-8129016254318897"
                slot="7763050933"
                format="auto"
                layoutKey="-gw-1+2a-9x+5c"
                responsive="true" />
        </div>

    </div>
}
export default RenderPaper;