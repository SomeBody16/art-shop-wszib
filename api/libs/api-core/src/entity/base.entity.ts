import { BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { generateToken } from '@api/util'

export class BaseEntity {
    /**
     * 5 length string, ex: vu8FD
     */
    @PrimaryColumn('varchar')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    private assertIdGenerated() {
        this.id ??= generateToken()
    }
}
