import * as migration_20261008_085322_initial from './20261008_085322_initial';
import * as migration_20261008_154012_peran_pengguna from './20261008_154012_peran_pengguna';
import * as migration_20261008_161515_lead from './20261008_161515_lead';
import * as migration_20261008_222034_insight_layanan from './20261008_222034_insight_layanan';
import * as migration_20261008_230450_pengaturan_situs from './20261008_230450_pengaturan_situs';

export const migrations = [
  {
    up: migration_20261008_085322_initial.up,
    down: migration_20261008_085322_initial.down,
    name: '20261008_085322_initial',
  },
  {
    up: migration_20261008_154012_peran_pengguna.up,
    down: migration_20261008_154012_peran_pengguna.down,
    name: '20261008_154012_peran_pengguna',
  },
  {
    up: migration_20261008_161515_lead.up,
    down: migration_20261008_161515_lead.down,
    name: '20261008_161515_lead',
  },
  {
    up: migration_20261008_222034_insight_layanan.up,
    down: migration_20261008_222034_insight_layanan.down,
    name: '20261008_222034_insight_layanan',
  },
  {
    up: migration_20261008_230450_pengaturan_situs.up,
    down: migration_20261008_230450_pengaturan_situs.down,
    name: '20261008_230450_pengaturan_situs'
  },
];
