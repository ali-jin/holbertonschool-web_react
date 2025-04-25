import coursesSlice, { clearCourses, fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('coursesSlice', () => {
    const initialState = {
        courses: [],
        status: 'idle',
        error: null
    };

    it('Should return the initial state', () => {
        expect(coursesSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    describe('fetchCourses async thunk', () => {
        it('Should handle fetchCourses.pending', () => {
            const action = { type: fetchCourses.pending.type };
            const state = coursesSlice(initialState, action);
            expect(state).toEqual({
                ...initialState,
                status: 'loading'
            });
        });

        it('Should handle fetchCourses.fulfilled', () => {
            const mockCourses = [
                { id: 1, name: 'ES6', credit: 60 },
                { id: 2, name: 'Webpack', credit: 20 }
            ];
            const action = { type: fetchCourses.fulfilled.type, payload: mockCourses };
            const state = coursesSlice(initialState, action);
            expect(state).toEqual({
                ...initialState,
                status: 'succeeded',
                courses: mockCourses
            });
        });

        it('Should handle fetchCourses.rejected', () => {
            const action = {
                type: fetchCourses.rejected.type,
                error: { message: 'Network error' }
            };
            const state = coursesSlice(initialState, action);
            expect(state).toEqual({
                ...initialState,
                status: 'failed',
                error: 'Network error'
            });
        });

        it('Should handle fetchCourses.rejected when base URL or port is incorrect', async () => {
            const incorrectBaseURL = 'http://loclhost:5173';
            mock.onGet(`${incorrectBaseURL}/courses.json`).networkError();
            const dispatch = jest.fn();
            const getState = jest.fn();
            await fetchCourses()(dispatch, getState, null);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: fetchCourses.rejected.type,
                })
            );
        });

        it('Should handle fetchCourses.rejected when endpoint is incorrect', async () => {
            const incorrectEndpoint = 'http://localhost:5173/corses.json';
            mock.onGet(incorrectEndpoint).reply(404);
            const dispatch = jest.fn();
            const getState = jest.fn();
            await fetchCourses()(dispatch, getState, null);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: fetchCourses.rejected.type,
                })
            );
        });

        it('Test courses', async () => {
            mock.onGet('http://localhost:5173/courses.json').reply(200, {
                "courses": [
                    { "id": 1, "name": "ES6", "credit": 60 },
                    { "id": 2, "name": "Webpack", "credit": 20 },
                    { "id": 3, "name": "React", "credit": 40 }
                ]
            });
            const coursesResponse = await axios.get('http://localhost:5173/courses.json');
            const dispatch = jest.fn();
            const getState = jest.fn();
            await fetchCourses()(dispatch, getState, null);
            expect(dispatch).toHaveBeenCalledTimes(2);
            const fulfilledAction = dispatch.mock.calls[1][0];
            expect(fulfilledAction).toEqual(
                expect.objectContaining({
                    type: fetchCourses.fulfilled.type,
                    payload: coursesResponse.data.courses,
                })
            );
        });
    });

    describe('clearCourses action', () => {
        it('Should clear courses array', () => {
            const previousState = {
                courses: [
                    { id: 1, name: 'ES6', credit: 60 },
                    { id: 2, name: 'Webpack', credit: 20 }
                ],
                status: 'succeeded',
                error: null
            };
            const state = coursesSlice(previousState, clearCourses());
            expect(state).toEqual(initialState);
        });
    });

    describe('logout action', () => {
        it('Should reset courses array on logout', () => {
            const stateWithCourses = {
                courses: [
                    { id: 1, title: 'Introduction to Programming' },
                    { id: 2, title: 'Advanced Mathematics' },
                ],
                status: 'succeeded',
                error: null
            };
            const action = { type: logout.type };
            const state = coursesSlice(stateWithCourses, action);
            expect(state).toEqual(initialState);
        });
    });
});
