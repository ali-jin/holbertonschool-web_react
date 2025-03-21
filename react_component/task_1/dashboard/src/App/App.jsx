import React from 'react'
import PropTypes from 'prop-types';
import './App.css'
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CourseList from '../CourseList/CourseList'
import { getLatestNotification } from '../utils/utils';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeydown = this.handleKeydown(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = (event) => {
        if (event.ctrlKey && event.key === "h") {
            window.alert("Logging you out");
            this.props.logOut();
        };
    };

    render() {
        const { isLoggedIn } = this.props;
        const listCourses = [
            { id: 1, name: 'ES6', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 40 },
        ]
        const htmlObj = getLatestNotification();
        const listNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New course available' },
            { id: 3, type: 'urgent', html: htmlObj },
        ]
        return (
            <>
                <Notifications displayDrawer={false} listNotifications={listNotifications} />
                <div className="App">
                    <Header />
                    {isLoggedIn ? <CourseList listCourses={listCourses} /> : <Login />}
                    <Footer />
                </div>
            </>
        );
    }
};

App.propTypes = {
    isLoggedIn: PropTypes.bool,
    logOut: PropTypes.func,
};

App.defaultProps = {
    isLoggedIn: false,
    logOut: () => { },
};

export default App;
