import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import { bindActionCreators } from 'redux';

// Action creator for selecting a course
export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index,
  };
}

// Action creator for unselecting a course
export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}

export function boundCourseActions(dispatch) {
  return bindActionCreators(
    {
      selectCourse,
      unSelectCourse
    },
    dispatch
  );
}

export function setCourses(courses) {
  return {
    type: FETCH_COURSE_SUCCESS,
    courses
  }
}

export function fetchCourses() {
  return async (dispatch) => {
    return fetch('/courses.json')
      .then((response) => response.json())
      .then((json) => {
        const normalizedCourses = json.map(course => ({
          ...course,
          id: String(course.id)
        }));
        console.log("Courses after normalization:", normalizedCourses);
        dispatch(setCourses(normalizedCourses));
      });
  }
}
