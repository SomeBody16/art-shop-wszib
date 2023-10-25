import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Admin = createParamDecorator((data, ctx) => GqlExecutionContext.create(ctx).getContext().admin)
