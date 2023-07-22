import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
    const users = [
        { name: 'jane', email: 'jane@jane.com' },
        { name: 'sam', email: 'same@sam.com' }
    ];

    render(<UserList users={users} />);

    return {
        users,
    }
}


test('render one row per user', () => {
    // render the component
    renderComponent()
    const users = [
        { name: 'jane', email: 'jane@jane.com' },
        { name: 'sam', email: 'same@sam.com' }
    ];
    const { container } = render(<UserList users={users} />);

    // Find all the rows in the table

    // container.querySelector()
    // eslint-disable-next-line
    const rows = container.querySelectorAll('tbody tr');
    // console.log(table)

    // const rows = screen.logTestingPlaygroundURL();
    // Getby test id
    // const rows = within(screen.getByTestId('users')).getAllByRole('row');
    expect(rows).toHaveLength(2);
    // Asserion: correct number of rows in th table

});


test('render the email and name of each user', () => {
    // const users = [
    //     { name: 'jane', email: 'jane@jane.com' },
    //     { name: 'sam', email: 'same@sam.com' }
    // ];
    const { users } = renderComponent();



    // render(<UserList users={users} />);

    for (let user of users) {
        const name = screen.getByRole('cell', { name: user.name });
        const email = screen.getByRole('cell', { name: user.email });


        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
    // const row = screen.logTestingPlaygroundURL();
})