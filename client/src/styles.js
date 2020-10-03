import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    base: {
        backgroundColor: '#06070B'
    },
    container: {
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        flexGrow: 1,
    },
}));

export default useStyles;