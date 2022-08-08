import React from 'react';
import '../matchMedia.js';
import HomeList from '../components/bankLanding/HomeList';
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from 'react-router-dom';

describe("snapshot testing", () => {
    test("snapshot for Home component", () => {
        const renderedComponent = renderer.create(
        <Router>
            <HomeList />
        </Router>).toJSON()
        expect(renderedComponent).toMatchSnapshot()
    })
}) 