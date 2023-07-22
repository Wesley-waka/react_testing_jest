import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';
// GOAL:

createServer([
    {
        path: '/api/repositories',
        method: 'get',
        res: (req, res, ctx) => {
            const language = req.url.searchParams.get('q').split('language:')[1];
            console.log(req.url.searchParams.get('q'))
            return {
                items: [{
                    id: 1, full_name: `${language}_one`
                },
                {
                    id: 2, full_name: `${language}_two`
                },]
            }
        }
    },
    // {
    //     path: '/api/repositories',
    //     method: 'get',
    //     res: (req, res, ctx) => {
    //         return {
    //             items: [{}, {}]
    //         }
    //     }
    // }
])

const handlers = [
    rest.get('/api/repositories', (req, res, ctx) => {
        // const query = req.url.searchParams.get('q')
        // console.log(query);
        const language = req.url.searchParams.get('q').split('language:')[1];



        return res(
            ctx.json({
                items: [
                    // {
                    //     id: 1, full_name: "full name!!!"
                    // },
                    // {
                    //     id: 1, full_name: `${language}_one`
                    // },
                    // {
                    //     id: 2, full_name: `${language}_two`
                    // },
                    // {
                    //     id: 2, full_name: 'other name!!'
                    // },
                ],
            })
        )
    })
];

// const server = setupServer(...handlers);

// beforeAll(() => {
//     server.listen();
// });

// afterEach(() => {
//     server.resetHandlers();
// });

// afterAll(() => {
//     server.close();
// });

test('renders two links for each language', async () => {
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>

    );
    // screen.debug();
    // Loop over each language
    const languages = [
        'javascript',
        'typescript',
        'rust',
        'go',
        // 'python',
        // 'java'
    ];
    for (let language of languages) {
        // For each language, make sure we see two links
        const links = await screen.findAllByRole('link', {
            name: new RegExp(`${language}_`),
        });

        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
    }
    // 

});

export const pause = () => new Promise((resolve) => {
    setTimeout(resolve, 100);
})