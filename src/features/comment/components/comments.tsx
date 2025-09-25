import { CardCompact } from "@/components/card-compact";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created for this ticket"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key={`delete-${comment.id}`}
                      id={comment.id}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
};

export { Comments };
