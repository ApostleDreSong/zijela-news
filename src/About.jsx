import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Container, Grid, Paper } from '@material-ui/core';


const style = {
    img: {
        // transform: 'rotate(90deg)'
    }
};

class About extends Component {
    reRoute = (route) => {
        window.open(
            route,
            '_blank' // <- This is what makes it open in a new window.
        );
    };

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    render() {
        return (
            <Container maxWidth="xl" style={{ marginTop: "20px" }}>
                <Paper>
                    <Grid container justify="center" spacing={3}>
                        <Grid item sm={12} md={4}>
                            <img style={style.img} width="100%" src="Dami1.jpg" alt="Damilare Ademeso" />
                            I love to turn things around...lol &#128540; Yes I'm good like that &#128523;
                        </Grid>

                        <Grid item sm={12} md={4}>
                            <h2 style={style.heading}>Damilare ADEMESO</h2>
                            <p> Damilare is a full-stack Engineer fluent in the following technologies:</p>
                            <ul>
                                <li>HTML5</li>
                                <li>CSS3</li>
                                <li>Bootstrap</li>
                                <li>Material UI</li>
                                <li>React.JS</li>
                                <li>React Native</li>
                                <li>Node.JS/Express.JS</li>
                                <li>Mongo DB/Mongoose</li>
                                <li>MySQL/Sequelize</li>
                                <li>PHP</li>
                                <li>WordPress</li>
                            </ul>
                            <p>Damilare has development experience with Interswitch, Zijela ICT and other oranizations</p>
                            <div>
                                <GitHubIcon style={style.point} onClick={() => this.reRoute('https://github.com/ApostleDreSong')} />
                                <LinkedInIcon style={style.point} onClick={() => this.reRoute('https://www.linkedin.com/in/damilare-ademeso-b43205130/')} />
                                <TwitterIcon style={style.point} onClick={() => this.reRoute('https://twitter.com/dresongafrika')} />
                            </div>
                            <div>Interested in a Web App or Mobile App? Call +2348136776626 or send a mail to ademesodamilare@gmail.com</div>
                        </Grid>
                    </Grid>
                </Paper>
                <div style={{ minWidth: "250px" }}>
                    <ins className='adsbygoogle'
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-8129016254318897"
                        data-ad-slot="7763050933"
                        data-ad-format="auto"
                        data-full-width-responsive="true" />
                </div>
            </Container>
        );
    }
}

export default withRouter(About);