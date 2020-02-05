import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RenderPaper from './RenderPaper';
import axios from 'axios';
import AdSense from 'react-adsense';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box style={{boxSizing: "border-box"}} p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    menu: {
        backgroundColor: 'black',
        color: 'white'
    },
    content: {
        marginTop: '30px',
        boxSizing: "border-box"
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    var [papers, setPapers] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
    	let mounted = true;
        axios({
            method: 'get',
            url: `newspaper-details.json`,
        })
        .then(function (response) {
       		if (mounted) {
            	setPapers(response.data.details);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        return () => {
            mounted = false;
        };
    }, [])

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs"
                    className={classes.menu}
                >
                    {
                        papers.length ?
                            papers.map((paper, index) => (
                                <Tab key={index} label={paper[0]} {...a11yProps(index)} />
                            ))
                            : null
                    }
                </Tabs>
            </AppBar>
            <Container className={classes.content} maxWidth="xl">
                <Grid container>
                    <Grid item sm={12} md={4}>

                    </Grid>
                    <Grid item sm={12} md={8}>
                        <Paper>
                            {
                                papers.length ?
                                    papers.map((paper, index) => (
                                        <TabPanel key={index} value={value} index={index}>
                                            <h2>{paper[0]}</h2>
                                            <RenderPaper paperName={paper[0]} url={paper[1]} />
                                        </TabPanel>
                                    ))
                                    : null
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
