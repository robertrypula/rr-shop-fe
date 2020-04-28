import { Bar, BarStore } from '../../models/bar.model';

export const toBar = (barStore: BarStore): Bar => {
  return new Bar().fromStore(barStore);
};
