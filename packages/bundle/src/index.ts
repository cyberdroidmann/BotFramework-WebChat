/* eslint dot-notation: ["error", { "allowPattern": "^WebChat$" }] */
// window['WebChat'] is required for TypeScript

export * from './index-minimal';

import { hooks, version } from './index-minimal';
import addVersion from './addVersion';
import coreRenderWebChat from './renderWebChat';
import createCognitiveServicesBingSpeechPonyfillFactory from './createCognitiveServicesBingSpeechPonyfillFactory';
import createCognitiveServicesSpeechServicesPonyfillFactory from './createCognitiveServicesSpeechServicesPonyfillFactory';
import createStyleSet from './adaptiveCards/Styles/createStyleSetWithAdaptiveCards';
import defaultCreateDirectLine from './createDirectLine';
import ReactWebChat from './FullReactWebChat';
import renderMarkdown from './renderMarkdown';
import useAdaptiveCardsHostConfig from './adaptiveCards/hooks/useAdaptiveCardsHostConfig';
import useAdaptiveCardsPackage from './adaptiveCards/hooks/useAdaptiveCardsPackage';

const renderWebChat = coreRenderWebChat.bind(null, ReactWebChat);

export const createDirectLine = options => {
  options.botAgent &&
    console.warn(
      'Web Chat: Developers are not currently allowed to set botAgent. See https://github.com/microsoft/BotFramework-WebChat/issues/2119 for more details.'
    );
  return defaultCreateDirectLine({ ...options, botAgent: `WebChat/${version} (Full)` });
};

const patchedHooks = {
  ...hooks,
  useAdaptiveCardsHostConfig,
  useAdaptiveCardsPackage
};

export default ReactWebChat;

export {
  createCognitiveServicesBingSpeechPonyfillFactory,
  createCognitiveServicesSpeechServicesPonyfillFactory,
  createStyleSet,
  patchedHooks as hooks,
  renderMarkdown,
  renderWebChat
};

window['WebChat'] = {
  ...window['WebChat'],
  createCognitiveServicesBingSpeechPonyfillFactory,
  createCognitiveServicesSpeechServicesPonyfillFactory,
  createDirectLine,
  createStyleSet,
  hooks: patchedHooks,
  ReactWebChat,
  renderMarkdown,
  renderWebChat
};

addVersion('full');
