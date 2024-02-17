import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn  } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' }) // Specify the foreign key column name
  author: User;

  @Column({ default: true })
  authorId: number; // This will store the foreign key

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}