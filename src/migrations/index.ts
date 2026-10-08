import * as migration_20261008_085322_initial from './20261008_085322_initial';

export const migrations = [
  {
    up: migration_20261008_085322_initial.up,
    down: migration_20261008_085322_initial.down,
    name: '20261008_085322_initial'
  },
];
