import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LevelClearedDialog } from './LevelClearedDialog';

describe('<LevelClearedDialog/>', () => {
  // Mock function yang lebih modern
  const noop = jest.fn();

  it('displays the level cleared message, when there is a next level', () => {
    render(
      <LevelClearedDialog nextLevel={4} goToLevel={noop} goToLevelSelection={noop} />
    );
    
    // Menggunakan screen.getByTestId (rekomendasi terbaru daripada destrukturisasi render)
    expect(screen.getByTestId('message')).toHaveTextContent(/level cleared/i);
  });

  it('displays the game finished message, when there is no next level', () => {
    render(
      <LevelClearedDialog nextLevel={undefined} goToLevel={noop} goToLevelSelection={noop} />
    );
    
    expect(screen.getByTestId('message')).toHaveTextContent(
      /congratulations, you finished the game!/i
    );
  });

  it('displays a button to go to next level, when there is a next level', async () => {
    const goToLevel = jest.fn();
    const user = userEvent.setup(); // Setup user-event

    render(
      <LevelClearedDialog nextLevel={5} goToLevel={goToLevel} goToLevelSelection={noop} />
    );
    
    const button = screen.getByRole('button', { name: /go to next level/i });
    await user.click(button); // user-event bersifat async dan lebih akurat

    expect(goToLevel).toHaveBeenCalledWith(5);
  });

  it('does not display a button to go to next level, when there is no next level', () => {
    render(
      <LevelClearedDialog nextLevel={undefined} goToLevel={noop} goToLevelSelection={noop} />
    );
    
    // Menggunakan queryByRole untuk memastikan elemen tidak ada
    expect(screen.queryByRole('button', { name: /go to next level/i })).not.toBeInTheDocument();
  });

  it('displays a button to go to level selection screen', async () => {
    const goToLevelSelection = jest.fn();
    const user = userEvent.setup();

    render(
      <LevelClearedDialog nextLevel={5} goToLevel={noop} goToLevelSelection={goToLevelSelection} />
    );
    
    const button = screen.getByRole('button', { name: /back to level selection/i });
    await user.click(button);

    expect(goToLevelSelection).toHaveBeenCalledTimes(1);
  });
});