import app from 'flarum/forum/app';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import classList from 'flarum/common/utils/classList';
import { data, networkIcons, networks, ShareableDiscussion } from './share';
import pupa from 'pupa';
import Mithril from 'mithril';

export const getNetworkButton = ({
  network,
  discussion,
  isRounded = false,
}: {
  network: string;
  discussion: ShareableDiscussion;
  isRounded?: boolean;
}): Mithril.Children => {
  return (
    <Button
      className={classList(`Button Button--block Share--${network}`, isRounded && 'Button--rounded')}
      icon={`${networkIcons[network] || `fab fa-${network}`} fa-lg fa-fw`}
      onclick={onNetworkButtonClick.bind(null, network, discussion)}
    >
      {app.translator.trans(`fof-share-social.lib.networks.${network}`)}
    </Button>
  );
};

export const onNetworkButtonClick = (network: string, discussion: ShareableDiscussion): void => {
  const payload = data(discussion);
  const action = networks[network];

  if (typeof action === 'function') {
    action(payload);
    return;
  }

  const width = 1000;
  const height = 500;
  const top = window.innerHeight / 2 - height / 2;
  const left = window.innerWidth / 2 - width / 2;
  const windowParams = `width=${width}, height=${height}, top=${top}, left=${left}, status=no, scrollbars=no, resizable=no`;

  const encodedPayload: Record<string, string> = {};
  for (const key in payload) {
    encodedPayload[key] = encodeURIComponent(payload[key as keyof typeof payload]);
  }

  window.open(pupa(action, encodedPayload), app.title, windowParams);
};

export const getNetworkButtons = (discussion: ShareableDiscussion, isRounded?: boolean): ItemList<Mithril.Children> => {
  const list = new ItemList<Mithril.Children>();
  const enabledNetworks: string[] = app.forum.attribute('fof-share-social.networks');
  const def: string = app.forum.attribute('fof-share-social.default');

  for (const network of enabledNetworks) {
    // Do not add native share option if not supported
    if (network === 'native' && !navigator.canShare?.(data(discussion))) continue;

    list.add(network, getNetworkButton({ network, discussion, isRounded }));
  }

  if (list.has(def)) {
    list.setPriority(def, 1000);
  }

  return list;
};
