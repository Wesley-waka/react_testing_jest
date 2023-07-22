import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';
import { pause } from '../../routes/HomeRoute.test';
import { SWRConfig } from 'swr';

async function renderComponent() {
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <MemoryRouter >
                <AuthButtons />
            </MemoryRouter >
        </SWRConfig>
    )
    await screen.findAllByRole('link');

}
describe('when user is not signed in', () => {
    // createServer() ---> GET 'api/user' ---> {user: null}
    createServer([
        {
            path: '/api/user', res: () => {
                console.log('LOGGED IN RESPONSE');

                return { user: null }
            }
        }
    ])
    test('when user is not sign in , sign in and sign up are visible', async () => {
        await renderComponent();
        const signInButton = screen.getByRole('link', {
            name: /sign in/i
        });

        const signUpButton = screen.getByRole('link', {
            name: /sign up/i
        });

        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveAttribute('href', '/signin');
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute('href', '/signup');


    });

    test('when user is not signed in, sign out is not visible', async () => {
        await renderComponent();

        const signOutButton = screen.queryByRole('link', {
            name: /sign out/i
        })

        expect(signOutButton).not.toBeInTheDocument();
    });

});
// describe.only('when user is not signed in', () => {
//     // createServer() ---> GET 'api/user' ---> {user: null}
//     createServer([
//         {
//             path: '/api/user', res: () => {
//                 return { user: null }
//             }
//         }
//     ])
//     test('when user is not sign in , sign in and sign up are visible', async () => {
//         await renderComponent();
//         const signInButton = screen.getByRole('link', {
//             name: /sign in/i
//         });

//         const signUpButton = screen.getByRole('link', {
//             name: /sign up/i
//         });

//         expect(signInButton).toBeInTheDocument();
//         expect(signInButton).toHaveAttribute('href', '/signin');
//         expect(signUpButton).toBeInTheDocument();
//         expect(signUpButton).toHaveAttribute('href', '/signup');


//     });

//     test('when user is not signed in, sign out is not visible', async () => {
//         await renderComponent();

//         const signOutButton = screen.queryByRole('link', {
//             name: /sign out/i
//         })

//         expect(signOutButton).not.toBeInTheDocument();
//     });

// });


describe('when user is signed in', () => {
    // createServer() ---> GET 'api/user' ---> {user:{id: 3,email: 'wes@gmail.com'}}

    createServer([
        {
            path: '/api/user',
            res: () => {
                console.log('NOT LOGGED IN');
                return { user: { id: 3, email: 'wes@gmail.com' } }
            }
        }
    ])


    // createServer() ---> GET 'api/user' ---> {user:{id:3, email:wes@gmail.com}}
    test('sign in and sign up are visible', async () => {
        await renderComponent();

        const signInButton = screen.getByRole('link', {
            name: /sign in/i,
        });
        const signUpButton = screen.getByRole('link', {
            name: /sign up/i,
        });

        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveAttribute('href', '/signin');
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute('href', '/signup');
    });

    test('sign out is not visible', async () => {
        await renderComponent();

        const signOutButton = screen.queryByRole('link', {
            name: /sign out/i,
        });

        expect(signOutButton).not.toBeInTheDocument();
    });
})

