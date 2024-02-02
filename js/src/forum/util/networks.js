import app from 'flarum/forum/app';
import ItemList from 'flarum/common/utils/ItemList';
import Button from 'flarum/common/components/Button';
import classList from 'flarum/common/utils/classList';
import { data, networkIcons, networks } from './share';
import pupa from 'pupa';

export const getNetworkButton = ({ network, discussion, isRounded = false }) => {
  return (
    <Button
      className={classList(`Button Button--block Share--${network}`, isRounded && 'Button--rounded')}
      icon={`${networkIcons[network] || `fab fa-${network}`} fa-lg fa-fw`}
      onclick={onNetworkButtonClick.bind(this, network, discussion)}
    >
      {app.translator.trans(`fof-share-social.lib.networks.${network}`)}
    </Button>
  );
};

export const onNetworkButtonClick = (network, discussion) => {
  const payload = data(discussion);
  const action = networks[network];

  if (typeof action === 'function') {
    return action(payload);
  }

  const width = 1000;
  const height = 500;
  const top = $(window).height() / 2 - height / 2;
  const left = $(window).width() / 2 - width / 2;
  const windowParams = `width=${width}, height= ${height}, top=${top}, left=${left}, status=no, scrollbars=no, resizable=no`;

  for (const dataKey in payload) {
    payload[dataKey] = encodeURIComponent(payload[dataKey]);
  }

  window.open(pupa(action, payload), app.title, windowParams);
};

export const getNetworkButtons = (discussion, isRounded) => {
  const list = new ItemList();
  const networks = app.forum.attribute('fof-share-social.networks');
  const def = app.forum.attribute('fof-share-social.default');

  for (const network of networks) {
    // Do not add native share option if not supported
    if (network === 'native' && !navigator.canShare?.(data(discussion))) continue;

    list.add(network, getNetworkButton({ network, discussion, isRounded }));
  }

  if (list.has(def)) {
    list.setPriority(def, 1000);
  }

  return list;
};
