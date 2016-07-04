<?php 
namespace Avatar4eg\ShareSocial;

use Illuminate\Contracts\Events\Dispatcher;

return function(Dispatcher $events) {
    $events->subscribe(Listener\AddClientAssets::class);
    $events->subscribe(Listener\AddApiAttributes::class);
    $events->subscribe(Listener\AddHeadData::class);
};