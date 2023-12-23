export default {
  hello: () => `Hey there, I am a graphql server - hello`,
  say: (_: any, { name }: { name: String }) => `Hey ${name}, How are you?`,
}
