import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://bosch-hc-publication-generator-backend.kittelberger.net/graphql":
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzMjYsIm11c3RDaGFuZ2VQYXNzd29yZCI6ZmFsc2UsImlhdCI6MTczODMyMDg5NywiZXhwIjoxNzM4MzI0NDk3LCJhdWQiOiJCQlRNREI2IiwiaXNzIjoiQWR2YXN0YSBSNiBCYWNrZW5kIiwic3ViIjoicHNjaG90dCJ9.YklNoGG0Fcudy-25XSTTfUmHj8-MTOxtwJZRCarueTLMJC6jj2znGAQloS7MWG7Fd9aaHIP6fnR9vB3S7HOR5Dz7M9jQHWBDRFf17yojkzYUBMP9TYYZYHb41DHQJG1jsY3147b6v7tJfEytGsbAsrj6q2aLoeTOkQMmq7FyfOKOsO1HMl_HYxMu8MEzV7TlJ3LlKSIHLIrj8qkmZeJKIfKKAsojaWtNN_BmuQBk2Q-vBrxi_8yDFMSk-Dc9Lr1algeyW8N_kw2LGKQt4i-qMaUu7NMBOxkwR_GKPhRfPpofu5Gk22iJxI1CUlA7Qn8_Xx3sffTc74sq-zV7_RZKKPLjls_NPlQBUsUirSN7QIIWB3svFe6Cwf76LA8vVrqqgFYGOJzqlruFerl4n3LxrtrjYOHCp_m_YYBAl3b1MLDtKuER-8v1BMLRtZpdDoPSIR-ff8qwB03xwOFCK3qnqaTffJQJX8M_LAQG9hGj_JRMTm6BdcXHpcfhjD2aS2HMDHSqL_zaHDidIhxyB9GJvD1XohMUAErPrXmL7U5nA4WX4gLVQRm_CEsNQbfxbAJ8u2kwDPqmcZyI099bTb4hignwpDPU1JOra07YXZ8wBsz3nj5YKh2BWqTq7sW4m8j8xeVzugi15cZ7kK8dfipO1_CIuey6OCy9sJz5ZPgTTQM",
          },
        },
    },
  ],
  documents: "./queries/*",
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        dedupeFragments: true,
      },
    },
  },
};

export default config;
