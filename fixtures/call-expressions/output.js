import Component from '@glimmer/component';
import { timeout } from 'ember-concurrency';
import { task, restartableTask, dropTask, keepLatestTask, nope } from 'ember-concurrency-decorators';
import * as ec from 'ember-concurrency-decorators';

export default class FooComponent extends Component {
  @task()
  *hello(arg, promise, ...rest) {
    let result = yield promise;
    console.log('hello', result, ...rest);
    yield timeout(1000);
    return arg;
  }

  @restartableTask({ maxConcurrency: 3 })
  *restartable(arg, promise, ...rest) {
    let result = yield promise;
    console.log('hello', result, ...rest);
    yield timeout(1000);
    return arg;
  }

  @(dropTask())
  *drop(arg, promise, ...rest) {
    let result = yield promise;
    console.log('hello', result, ...rest);
    yield timeout(1000);
    return arg;
  }

  @(keepLatestTask({}))
  *keepLatest(arg, promise, ...rest) {
    let result = yield promise;
    console.log('hello', result, ...rest);
    yield timeout(1000);
    return arg;
  }

  @ec.enqueueTask({ maxConcurrency: 3 })
  *enqueue(arg, promise, ...rest) {
    let result = yield promise;
    console.log('hello', result, ...rest);
    yield timeout(1000);
    return arg;
  }

  @nope async notTask(arg, promise, ...rest) {
    let result = await promise;
    console.log('hello', result, ...rest);
    await timeout(1000);
    return arg;
  }
}
