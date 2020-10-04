import { fade, makeStyles } from '@material-ui/core/styles';
import background from './images/concert.jpg';

const useStyles = makeStyles((theme) => ({
    accordion: {
        backgroundColor: "#3e3f4d",
        color: "white",
        border: '1px solid rgba(0, 0, 0, .125)',
    },
    accordionHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionRoot: {
        width: '100%',
    },
    appbar: {
        background: 'linear-gradient(45deg, #000000 5%, #752625 45%, #CD9337 95%)',
    },
    artist: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: 195,
        width: 325,
        display: "flex",
        justifyContent: "left",
        // alignItems: "b",
        flexDirection: "column-reverse",
        backgroundSize: "128%",
        backgroundPosition: "50% 20%",
    },
    artistButton: {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.50),
        },
        margin: 5
    },
    artists: {
        flexGrow: 1,
        maxWidth: 1100,
        margin: 10,
        padding: 0
    },
    artistTitle: {
        color: 'white',
        fontSize: "2em",
    },
    base: {
        backgroundColor: '#06070B'
    },
    button: {
        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.50),
        },
        margin: 5,
    },
    buttonLite: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: 5
    },
    container: {
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        flexGrow: 1,
    },
    currentPage: {
        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.35),
        },
        cursor: "default",
        margin: 5,
        padding: 5,
        minWidth: 35
    },
    dateBox: {
        backgroundColor: '#CD9337',
        color: "white",
        width: 100
    },
    detailCard: {
        margin: 15,
        backgroundColor: "#3e3f4d",
        color: "white",
    },
    formItem: {
        padding: theme.spacing(2)
    },
    grow: {
        flexGrow: 1,
    },
    hero: {
        height: 350,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "0% 50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    authForm: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    logo: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    navsearch: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: 5,
        marginBottom: 2,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    pageButton: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        margin: 5,
        padding: 5,
        minWidth: 35
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#1a1c2e'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.35),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.50),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: 500,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchTitle: {
        color: 'white',
        fontSize: "2em"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
}));

export default useStyles;