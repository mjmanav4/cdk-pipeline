import * as cdk from '@aws-cdk/core';
import {Artifact, Pipeline} from "@aws-cdk/aws-codepipeline";
import {CodeBuildAction, GitHubSourceAction} from "@aws-cdk/aws-codepipeline-actions";
import {SecretValue} from "@aws-cdk/core"
import {BuildSpec, LinuxBuildImage, PipelineProject} from "@aws-cdk/aws-codebuild";

export class PipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new Pipeline(this, 'Pipleine', {
            pipelineName: 'Pipeline',
            crossAccountKeys: false
        })

        const sourceOutput = new Artifact("SourceOutput")

        pipeline.addStage({
            stageName: 'Source',
            actions: [
                new GitHubSourceAction({
                    owner: "mjmanav4",
                    repo: "cdk-pipeline",
                    branch: "main",
                    actionName: "Pipeline_Source",
                    oauthToken: SecretValue.secretsManager("Github-pipeline-token"),
                    output: sourceOutput
                })
            ]
        })


        const  cdkBuildOutput = new Artifact("CdkBuildOutput")
        pipeline.addStage({
            stageName: "Build",
            actions: [new CodeBuildAction({
                actionName: "CDK_BUILD",
                input: sourceOutput,
                outputs: [cdkBuildOutput],
                project: new PipelineProject(this, "CdkBuildProject", {
                    environment:{
                        buildImage: LinuxBuildImage.STANDARD_5_0,

                    },
                    buildSpec: BuildSpec.fromSourceFilename("build-specs/cdk-build-spec.yml")
                })
            })]
        })
        // The code that defines your stack goes here
    }
}